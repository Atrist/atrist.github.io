---
title: Making Predictions from 2D Data
date: 2020-6-2
tags:
  - js
  - Ai
summary: TensorFlow的官方项目--从二维数据进行预测的 教程翻译,以及做过的经验
---

## 参考资料

1. [TensorFlow 官方的二维数据进行预测的教程](https://codelabs.developers.google.com/codelabs/tfjs-training-regression/index.html?hl=zh_cn#0)

## 1. 简介

在这一次的实验中,你会训练一个模型根据一个描述汽车的二维数据中进行预测

该练习将演示训练许多不同模型的通用步骤，但将使用一个小的数据集和一个简单的（浅）模型。其主要目的是帮助您熟悉使用 TensorFlow.js 进行培训的模型的基本术语，概念和语法，并为进一步的探索和学习提供垫脚石。

因为我们正在训练一个模型来预测连续数，所以此任务有时称为[回归](https://developers.google.com/machine-learning/glossary/#regression_model)任务。我们将通过显示许多输入示例以及正确的输出来训练模型。这被称为[监督学习](https://developers.google.com/machine-learning/problem-framing/cases)。

### 你会建立什么

您将创建一个使用 TensorFlow.js 在浏览器中训练模型的网页。给定汽车的“马力”，模型将学习预测“每加仑英里”（MPG）。

为此，您将：

- 加载数据并准备进行训练。
- 定义模型的架构。
- 训练模型并在训练时监视其性能
- 通过做出一些预测来评估训练后的模型。

### 你会学到什么

1. 机器学习数据准备的最佳实践，包括混洗和规范化。
2. TensorFlow.js 语法，用于使用[tf.layers API](https://js.tensorflow.org/api/latest/#Layers)创建模型。
3. 如何使用[tfjs-vis 库](https://github.com/tensorflow/tfjs-vis)监视浏览器内训练。

### 你需要准备什么

1. 最新的版本 chrome 浏览器或者其他现代浏览器
2. 一个文本编辑器,推荐使用 vscode
3. 了解部分 html,css,js 以及 chrome
4. 对神经网络的高级概念理解。如果需要介绍或复习，请考虑观看[3blue1brown 的视频](https://www.youtube.com/watch?v=aircAruvnKk)或 A[shi Krishnan 的 Java 深度学习视频](https://www.youtube.com/watch?v=SV-cgdobtTA)。

## 2. 起步

### 1. 创建一个 html 文件

将下面代码 复制到一个`index.html`文件中

```html
<!DOCTYPE html>
<html>
  <head>
    <title>TensorFlow.js Tutorial</title>
    <!-- Import TensorFlow.js -->
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js"></script>
    <!-- Import tfjs-vis -->
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-vis@1.0.2/dist/tfjs-vis.umd.min.js"></script>
    <!-- Import the main script file -->
    <script src="script.js"></script>
  </head>
  <body></body>
</html>
```

### 2. 创建一个 js 文件

在同级目录下,创建一个 script.js 文件, 文件内容如下:

```js
console.log("Hello TensorFlow");
```

### 3. 测试

使用浏览器打开你的`index.html`文件

如果一切都正常工作的话,这里有两个全局变量可以在 开发者工具中查询到

- `tf`是对 TensorFlow.js 库的引用
- `tfvis`是对 tfjs-vis 库的引用

同时会有一条消息 `Hello TensorFlow`出现在开发者工具的`console`中

## 3. 加载,格式化和可视化输入数据

### 1. 加载

我们将从为您托管的 JSON 文件中加载“汽车”数据集。它包含有关每个给定汽车的许多不同功能。对于本教程，我们只想提取有关马力和每加仑英里数的数据。

添加如下代码到 `script.js`

```js
/**
 * Get the car data reduced to just the variables we are interested
 * and cleaned of missing data.
 */
async function getData() {
  const carsDataReq = await fetch(
    "https://storage.googleapis.com/tfjs-tutorials/carsData.json"
  );
  const carsData = await carsDataReq.json();
  const cleaned = carsData
    .map((car) => ({
      mpg: car.Miles_per_Gallon,
      horsepower: car.Horsepower,
    }))
    .filter((car) => car.mpg != null && car.horsepower != null);
  return cleaned;
}
```

这还将删除所有未定义每加仑英里数或马力的条目。我们还将这些数据绘制在散点图中以查看其外观。

将以下代码添加到 script.js 文件的底部

```js
async function run() {
  // Load and plot the original input data that we are going to train on.
  const data = await getData();
  const values = data.map((d) => ({
    x: d.horsepower,
    y: d.mpg,
  }));
  tfvis.render.scatterplot(
    { name: "Horsepower v MPG" },
    { values },
    {
      xLabel: "Horsepower",
      yLabel: "MPG",
      height: 300,
    }
  );
  // More code will be added below
}
document.addEventListener("DOMContentLoaded", run);
```

当年重新刷新你页面的时候,你会看见一个如下的界面:
![](https://codelabs.developers.google.com/codelabs/tfjs-training-regression/img/cf44e823106c758e.png)

该面板称为遮阳板，由[tfjs-vis](https://github.com/tensorflow/tfjs-vis)提供。它提供了一个方便的位置来显示可视化效果。

通常，在处理数据时，最好找到一种方法来查看数据并在必要时进行清理。在这种情况下，我们必须从 carsData 中删除某些没有所有必填字段的条目。可视化数据可以使我们了解模型是否可以学习数据的任何结构。

从上图可以看出，马力和 MPG 之间存在负相关关系，即，随着马力的增加，汽车每加仑行驶的里程通常会减少。

> 请记住：如果数据中没有任何结构（模式）（即数据是随机的），则该模型实际上将无法学习任何内容。

### 2. 概念化我们的任务

现在，我们的输入数据将如下所示。

```js
...
{
  "mpg":15,
  "horsepower":165,
},
{
  "mpg":18,
  "horsepower":150,
},
{
  "mpg":16,
  "horsepower":150,
},
...
```

我们的目标是训练一个模型，该模型将采用**一个马力数**，并学会预测**一个数字**，即每加仑英里数。记住一对一的映射，因为这对于下一节很重要。

我们将把这些示例（马力和 MPG）提供给神经网络，该神经网络将从这些示例中学习公式（或函数）来预测给定马力的 MPG。

我们从示例中得到正确答案的这种学习称为[监督学习](https://en.wikipedia.org/wiki/Supervised_learning)。

## 4. 定义模型架构

在本节中，我们将编写代码来描述模型架构。模型体系结构只是一种说法：“模型在执行时将运行哪些功能”，或者“模型将使用哪种算法来计算其答案”。

ML 模型是一种接受输入并产生输出的算法。使用神经网络时，该算法是一组神经元层，其中“权重”（数字）控制着它们的输出。训练过程将学习这些权重的理想值。

添加如下代码到 `script.js`文件中,用于定义模型架构:

```js
function createModel() {
  // 创建一个顺序模型
  const model = tf.sequential();
  // 添加单个输入层
  model.add(tf.layers.dense({ inputShape: [1], units: 1, useBias: true }));
  // 添加输出层
  model.add(tf.layers.dense({ units: 1, useBias: true }));
  return model;
}
```

这是我们可以在 tensorflow.js 中定义的最简单的模型之一，让我们细分每一行。

### 1. 实例化模型

```js
const model = tf.sequential();
```

这将实例化一个[tf.Model](https://js.tensorflow.org/api/latest/#class:Model)对象。该模型是[顺序的](https://js.tensorflow.org/api/latest/#sequential)，因为其输入直接向下流至其输出。其他类型的模型可以具有分支，甚至可以具有多个输入和输出，但是在许多情况下，您的模型将是顺序的。顺序模型还具有[易于使用的 API](https://js.tensorflow.org/api/latest/#class:Sequential)。

### 2. 添加图层

```js
model.add(tf.layers.dense({ inputShape: [1], units: 1, useBias: true }));
```

这为我们的网络添加了一个输入层，该输入层通过一个隐藏的单元自动连接到“密集”层。`密集层`是一种层的类型，它将其输入乘以一个矩阵（称为权重），然后将一个数字（称为偏差）加到结果上。由于这是网络的第一层，因此我们需要定义我们的`inputShape`。这个`inputShape`为`[1]`，因为我们有 1 个数字作为输入（给定汽车的马力）。

`units`设置权重矩阵在图层中的大小。通过在此处将其设置为 1，我们说数据的每个输入要素将具有 1 权重。

> 注意：密集层默认情况下带有一个偏差项，因此我们不需要将`useBias`设置为`true`，我们将省略对`tf.layers.dense`的进一步调用

```js
model.add(tf.layers.dense({ units: 1 }));
```

上面的代码创建了我们的输出层。我们将`units`设置为 1，因为我们要输出 1 个数字。

> 注意：在此示例中，由于隐藏层具有 1 个单位，因此我们实际上不需要在上面添加最终输出层（即我们可以将隐藏层用作输出层）。但是，定义一个单独的输出层使我们可以修改隐藏层中的单元数，同时保持输入和输出的一对一映射。

### 3. 创建一个实例

添加如下代码到 `script.js`的 `run`函数中:

```js
// Create the model
const model = createModel();
tfvis.show.modelSummary({ name: "Model Summary" }, model);
```

这将创建模型的实例，并显示网页上各层的摘要。

## 5.准备训练数据

为了获得使训练机器学习模型切实可行的 TensorFlow.js 的性能优势，我们需要将数据转换为[张量](https://developers.google.com/machine-learning/glossary/#tensor)。我们还将对数据进行一些最佳实践的转换，即**改组**和[标准化](https://developers.google.com/machine-learning/glossary/#normalization)。

添加如下代码到 `script.js`

```js
/**
 * Convert the input data to tensors that we can use for machine
 * learning. We will also do the important best practices of _shuffling_
 * the data and _normalizing_ the data
 * MPG on the y-axis.
 */
function convertToTensor(data) {
  // Wrapping these calculations in a tidy will dispose any
  // intermediate tensors.

  return tf.tidy(() => {
    //步骤1.随机整理数据
    tf.util.shuffle(data);
    //步骤2。将数据转换为Tensor
    const inputs = data.map((d) => d.horsepower);
    const labels = data.map((d) => d.mpg);
    const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
    const labelTensor = tf.tensor2d(labels, [labels.length, 1]);
    //第3步。使用最小-最大缩放将数据标准化为0-1的范围
    const inputMax = inputTensor.max();
    const inputMin = inputTensor.min();
    const labelMax = labelTensor.max();
    const labelMin = labelTensor.min();

    const normalizedInputs = inputTensor
      .sub(inputMin)
      .div(inputMax.sub(inputMin));
    const normalizedLabels = labelTensor
      .sub(labelMin)
      .div(labelMax.sub(labelMin));

    return {
      inputs: normalizedInputs,
      labels: normalizedLabels,
      // //返回最小/最大范围，以便以后使用。
      inputMax,
      inputMin,
      labelMax,
      labelMin,
    };
  });
}
```

让我们分解一下这里发生的事情。

### 1. 随机整理数据

```js
// Step 1. Shuffle the data
tf.util.shuffle(data);
```

在这里，我们随机化示例的顺序，然后将它们提供给训练算法。改组很重要，因为通常在训练过程中，数据集会被分成较小的子集，称为模型的子集。改组可帮助每个批次从整个数据分布中获取各种数据。通过这样做，我们可以帮助模型：

- 不学习纯粹依赖于数据输入顺序的东西
- 对子组的结构不敏感（例如，如果在训练的前半段只看到高马力的汽车，它可能会发现一种不适用于整个数据集的关系）

> 最佳实践 1：在将数据交给 TensorFlow.js 中的训练算法之前，您应该始终对数据进行清洗

### 2. 转换为张量

```js
// Step 2. Convert data to Tensor
const inputs = data.map((d) => d.horsepower);
const labels = data.map((d) => d.mpg);

const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
const labelTensor = tf.tensor2d(labels, [labels.length, 1]);
```

在这里，我们制作了两个数组，一个数组用于输入示例（马力条目），另一个数组用于真实的输出值（在机器学习中称为标签）。

然后，我们将每个数组数据转换为 2d 张量。张量的形状为`[num_examples，num_features_per_example]`。这里我们有`input.length`个示例，每个示例都有 1 个输入功能（马力）

### 3. 规范化数据

```js
//Step 3. Normalize the data to the range 0 - 1 using min-max scaling
const inputMax = inputTensor.max();
const inputMin = inputTensor.min();
const labelMax = labelTensor.max();
const labelMin = labelTensor.min();

const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));
```

接下来，我们为机器学习培训提供另一种最佳实践。我们[标准化](https://developers.google.com/machine-learning/data-prep/transform/normalization)数据。在这里，我们使用[最小-最大缩放](<https://en.wikipedia.org/wiki/Feature_scaling#Rescaling_(min-max_normalization)>)将数据归一化为数值范围 0-1。规范化很重要，因为您将使用 tensorflow.js 构建的许多机器学习模型的内部设计为可以处理不太大的数字。标准化数据的通用范围包括`0到1`或`-1到1`。如果您养成将数据标准化到某个合理范围的习惯，则可以在训练模型方面获得更大的成功。

> 最佳实践 2：您应该始终在训练之前考虑对数据进行标准化。某些数据集无需进行归一化即可学习，但是对数据进行归一化通常会消除一类阻碍有效学习的问题。<br/>
> 您可以在将数据转换为张量之前对其进行标准化。我们之所以这样做，是因为我们可以利用 TensorFlow.js 中的矢量化优势进行最小-最大缩放操作，而无需编写任何显式的 for 循环。

### 4. 返回数据和归一化界限

```js
return {
  inputs: normalizedInputs,
  labels: normalizedLabels,
  // Return the min/max bounds so we can use them later.
  inputMax,
  inputMin,
  labelMax,
  labelMin,
};
```

我们希望保留在训练期间用于标准化的值，以便我们可以对输出进行非标准化以使其恢复到原始比例，并允许我们以相同的方式标准化未来的输入数据。

## 6. 训练模型

创建模型实例并将数据表示为张量后，我们就可以开始训练过程了。

添加如下代码到`script.js`文件中

```js
async function trainModel(model, inputs, labels) {
  // Prepare the model for training.
  model.compile({
    optimizer: tf.train.adam(),
    loss: tf.losses.meanSquaredError,
    metrics: ["mse"],
  });

  const batchSize = 32;
  const epochs = 50;

  return await model.fit(inputs, labels, {
    batchSize,
    epochs,
    shuffle: true,
    callbacks: tfvis.show.fitCallbacks(
      { name: "Training Performance" },
      ["loss", "mse"],
      { height: 200, callbacks: ["onEpochEnd"] }
    ),
  });
}
```

让我们分解一下。

### 1. 准备训练

```js
// Prepare the model for training.
model.compile({
  optimizer: tf.train.adam(),
  loss: tf.losses.meanSquaredError,
  metrics: ["mse"],
});
```

在训练模型之前，我们必须“编译”模型。为此，我们必须指定一些非常重要的内容：

- [优化器](https://developers.google.com/machine-learning/glossary/#optimizer)：如示例所示，这是将用于控制模型更新的算法。TensorFlow.js 中有许多可用的优化器。在这里，我们选择了 adam 优化器，因为它在实践中非常有效并且不需要配置。
- [损失](https://developers.google.com/machine-learning/glossary/#loss)：该函数将告诉模型学习所显示的每个批次（数据子集）时的性能如何。在这里，我们使用[meanSquaredError](https://developers.google.com/machine-learning/glossary/#MSE)将模型所做的预测与真实值进行比较。

```js
const batchSize = 32;
const epochs = 50;
```

接下来，我们选择一个 batchSize 和多个时期：

- [batchSize](https://developers.google.com/machine-learning/glossary/#batch_size):是指模型在每次训练迭代中将看到的数据子集的大小。常见的批量大小通常在 32-512 之间。对于所有问题，实际上并没有理想的批量大小，并且描述各种批量大小的数学动机超出了本教程的范围。
- [epochs](https://developers.google.com/machine-learning/glossary/#epoch):取决于模型将查看您提供的整个数据集的次数。在这里，我们将对数据集进行 50 次迭代。

### 2. 开始训练循环

```js
return await model.fit(inputs, labels, {
  batchSize,
  epochs,
  callbacks: tfvis.show.fitCallbacks(
    { name: "Training Performance" },
    ["loss", "mse"],
    { height: 200, callbacks: ["onEpochEnd"] }
  ),
});
```

`model.fit`是我们用来启动训练循环的函数。它是一个异步函数，因此我们返回它给我们的`promise`，以便调用者可以确定训练何时完成。

为了监视训练进度，我们将一些回调传递给`model.fit`。我们使用[tfvis.show.fitCallbacks](https://js.tensorflow.org/api_vis/latest/#show.fitCallbacks)生成函数，以绘制我们先前指定的“损失”和“ mse”指标的图表。

### 3. 放在一起

现在，我们必须从`run`函数中调用已定义的函数。

添加如下代码到`script.js`中`run`函数当中:

```js
// Convert the data to a form we can use for training.
const tensorData = convertToTensor(data);
const { inputs, labels } = tensorData;

// Train the model
await trainModel(model, inputs, labels);
console.log("Done Training");
```

刷新页面时，几秒钟后，您将看到以下图形更新。

![](https://codelabs.developers.google.com/codelabs/tfjs-training-regression/img/c6d3214d6e8c3752.png)

这些是由我们之前创建的回调创建的。它们在每个时期结束时显示整个数据集的平均损耗和 mse。

训练模型时，我们希望看到损失减少。在这种情况下，由于我们的度量标准是一种误差度量，因此我们也希望看到它也有所下降。

> 如果您想在训练时了解幕后情况。阅读我们的指南或观看[3blue1brown 的视频](https://www.youtube.com/watch?v=IHZwWFHWa-w)。

## 7. 作出预测

现在我们的模型已经训练好了，我们要做出一些预测。让我们通过查看模型对低到高功率的均匀范围范围内的预测值来评估模型。

将以下函数添加到您的 script.js 文件中

```js
function testModel(model, inputData, normalizationData) {
  const { inputMax, inputMin, labelMin, labelMax } = normalizationData;
  // Generate predictions for a uniform range of numbers between 0 and 1;
  // We un-normalize the data by doing the inverse of the min-max scaling
  // that we did earlier.
  const [xs, preds] = tf.tidy(() => {
    const xs = tf.linspace(0, 1, 100);
    const preds = model.predict(xs.reshape([100, 1]));
    const unNormXs = xs.mul(inputMax.sub(inputMin)).add(inputMin);
    const unNormPreds = preds.mul(labelMax.sub(labelMin)).add(labelMin);
    // Un-normalize the data
    return [unNormXs.dataSync(), unNormPreds.dataSync()];
  });
  const predictedPoints = Array.from(xs).map((val, i) => {
    return { x: val, y: preds[i] };
  });
  const originalPoints = inputData.map((d) => ({
    x: d.horsepower,
    y: d.mpg,
  }));
  tfvis.render.scatterplot(
    { name: "Model Predictions vs Original Data" },
    {
      values: [originalPoints, predictedPoints],
      series: ["original", "predicted"],
    },
    {
      xLabel: "Horsepower",
      yLabel: "MPG",
      height: 300,
    }
  );
}
```

在上面的函数中需要注意的几件事。

```js
const xs = tf.linspace(0, 1, 100);
const preds = model.predict(xs.reshape([100, 1]));
```

我们生成了 100 个新的“示例”以供模型使用。 `Model.predict`是我们如何将这些示例输入到模型中。请注意，它们的形状必须与我们训练时的形状相似`([[num_examples，num_features_per_example])`。

```js
// Un-normalize the data
const unNormXs = xs.mul(inputMax.sub(inputMin)).add(inputMin);

const unNormPreds = preds.mul(labelMax.sub(labelMin)).add(labelMin);
```

为了使数据回到我们的原始范围（而不是 0-1），我们使用在归一化时计算出的值，但只是反转了运算。

```js
return [unNormXs.dataSync(), unNormPreds.dataSync()];
```

[.dataSync（）](https://js.tensorflow.org/api/latest/#tf.Tensor.dataSync)是一种我们可以用来获取张量中存储的值的 typedarray 的方法。这使我们可以使用常规 JavaScript 处理这些值。这是通常首选的[.data（）](https://js.tensorflow.org/api/latest/#tf.Tensor.data)方法的同步版本。

最后，我们使用 tfjs-vis 绘制原始数据和模型的预测。

将以下代码添加到您的`run`函数当中

```js
// Make some predictions using the model and compare them to the
// original data
testModel(model, data, tensorData);
```

刷新页面，模型完成训练后，您应该会看到类似以下的内容。
![](https://codelabs.developers.google.com/codelabs/tfjs-training-regression/img/fe610ff34708d4a.png)

恭喜你！您刚刚训练了一个简单的机器学习模型。它当前执行所谓的线性回归，该回归试图使一条线适应输入数据中出现的趋势。

## 8. 主要收获

训练机器学习模型的步骤包括：

1. 制定任务：

   - 是回归问题还是分类问题？
   - 可以通过有监督的学习还是无监督的学习来完成？
   - 输入数据的形状是什么？输出数据应该是什么样？

2. 准备数据：
   - 清理数据并在可能的情况下手动检查其是否有图案
   - 在将数据用于训练之前先对其进行清洗
   - 将您的数据标准化到神经网络的合理范围内。通常 0-1 或-1-1 是数字数据的良好范围
   - 将数据转换为张量
3. 建立并运行模型

   - 使用`tf.sequential`或`tf.model`定义模型，然后使用`tf.layers.*`向其中添加层
   - 选择一个优化器（[adam](https://developers.google.com/machine-learning/glossary/#optimizer)是一个很好的优化器），以及批处理大小和时期数之类的参数。
   - 选择一个适合您问题的[损失函数](https://developers.google.com/machine-learning/glossary/#loss)，以及一个准确性指标以帮助您评估进度。 [meanSquaredError](https://developers.google.com/machine-learning/glossary/#MSE)是回归问题的常见损失函数。
   - 监视训练以查看损失是否正在减少

4. 评估模型
   - 为模型选择一个评估指标，您可以在训练过程中对其进行监控。训练完毕后，请尝试进行一些测试预测，以提高预测质量。

### 主要代码

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <title>TensorFlow.js Tutorial</title>
    <!-- Import TensorFlow.js -->
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js"></script>
    <!-- Import tfjs-vis -->
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-vis@1.0.2/dist/tfjs-vis.umd.min.js"></script>

    <!-- Import the main script file -->
    <script src="script.js"></script>
  </head>

  <body></body>
</html>
```

`script.js`的代码:

```js
console.log("Hello TensorFlow");

async function getData() {
  const carsDataReq = await fetch(
    "https://storage.googleapis.com/tfjs-tutorials/carsData.json"
  );
  const carsData = await carsDataReq.json();
  const cleaned = carsData
    .map((car) => ({
      mpg: car.Miles_per_Gallon,
      horsepower: car.Horsepower,
    }))
    .filter((car) => car.mpg != null && car.horsepower != null);
  return cleaned;
}

async function run() {
  // Load and plot the original input data that we are going to train on.
  const data = await getData();
  const values = data.map((d) => ({
    x: d.horsepower,
    y: d.mpg,
  }));

  tfvis.render.scatterplot(
    {
      name: "Horsepower v MPG",
    },
    {
      values,
    },
    {
      xLabel: "Horsepower",
      yLabel: "MPG",
      height: 300,
    }
  );

  // Create the model
  const model = createModel();
  tfvis.show.modelSummary(
    {
      name: "Model Summary",
    },
    model
  );
  // Convert the data to a form we can use for training.
  const tensorData = convertToTensor(data);
  const { inputs, labels } = tensorData;

  // Train the model
  await trainModel(model, inputs, labels);
  // More code will be added below
  console.log("Done Training");
  // Make some predictions using the model and compare them to the
  // original data
  testModel(model, data, tensorData);
}

function createModel() {
  // Create a sequential model
  const model = tf.sequential();
  // Add a single input layer
  model.add(
    tf.layers.dense({
      inputShape: [1],
      units: 1,
      useBias: true,
    })
  );

  // Add an output layer
  model.add(
    tf.layers.dense({
      units: 1,
      useBias: true,
    })
  );
  return model;
}
/**
 * Convert the input data to tensors that we can use for machine
 * learning. We will also do the important best practices of _shuffling_
 * the data and _normalizing_ the data
 * MPG on the y-axis.
 */
function convertToTensor(data) {
  // Wrapping these calculations in a tidy will dispose any
  // intermediate tensors.
  return tf.tidy(() => {
    // Step 1. Shuffle the data
    tf.util.shuffle(data);

    // Step 2. Convert data to Tensor
    const inputs = data.map((d) => d.horsepower);
    const labels = data.map((d) => d.mpg);

    const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
    const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

    //Step 3. Normalize the data to the range 0 - 1 using min-max scaling
    const inputMax = inputTensor.max();
    const inputMin = inputTensor.min();
    const labelMax = labelTensor.max();
    const labelMin = labelTensor.min();

    const normalizedInputs = inputTensor
      .sub(inputMin)
      .div(inputMax.sub(inputMin));
    const normalizedLabels = labelTensor
      .sub(labelMin)
      .div(labelMax.sub(labelMin));

    return {
      inputs: normalizedInputs,
      labels: normalizedLabels,
      // Return the min/max bounds so we can use them later.
      inputMax,
      inputMin,
      labelMax,
      labelMin,
    };
  });
}
async function trainModel(model, inputs, labels) {
  // Prepare the model for training.
  model.compile({
    optimizer: tf.train.adam(),
    loss: tf.losses.meanSquaredError,
    metrics: ["mse"],
  });

  const batchSize = 32;
  const epochs = 50;
  return await model.fit(inputs, labels, {
    batchSize,
    epochs,
    shuffle: true,
    callbacks: tfvis.show.fitCallbacks(
      {
        name: "Training Performance",
      },
      ["loss", "mse"],
      {
        height: 200,
        callbacks: ["onEpochEnd"],
      }
    ),
  });
}
function testModel(model, inputData, normalizationData) {
  const { inputMax, inputMin, labelMin, labelMax } = normalizationData;
  // Generate predictions for a uniform range of numbers between 0 and 1;
  // We un-normalize the data by doing the inverse of the min-max scaling
  // that we did earlier.
  const [xs, preds] = tf.tidy(() => {
    const xs = tf.linspace(0, 1, 100);
    const preds = model.predict(xs.reshape([100, 1]));
    const unNormXs = xs.mul(inputMax.sub(inputMin)).add(inputMin);
    const unNormPreds = preds.mul(labelMax.sub(labelMin)).add(labelMin);
    // Un-normalize the data
    return [unNormXs.dataSync(), unNormPreds.dataSync()];
  });
  const predictedPoints = Array.from(xs).map((val, i) => {
    return {
      x: val,
      y: preds[i],
    };
  });
  const originalPoints = inputData.map((d) => ({
    x: d.horsepower,
    y: d.mpg,
  }));
  tfvis.render.scatterplot(
    {
      name: "Model Predictions vs Original Data",
    },
    {
      values: [originalPoints, predictedPoints],
      series: ["original", "predicted"],
    },
    {
      xLabel: "Horsepower",
      yLabel: "MPG",
      height: 300,
    }
  );
}
document.addEventListener("DOMContentLoaded", run);
```

运行后的结果:

## 9.额外：尝试的事情

- 尝试更改 epochs 变量。在图表变平之前，您需要多少个 epochs。
- 尝试增加隐藏层中的 units 数量。
- 尝试在添加的第一个隐藏层和最终输出层之间添加更多隐藏层。这些额外层的代码应如下所示
  ```js
  model.add(tf.layers.dense({ units: 50, activation: "sigmoid" }));
  ```

这些隐藏层最重要的新事物是它们引入了非线性激活函数，在这种情况下为[S 型](https://developers.google.com/machine-learning/glossary/#sigmoid_function)激活。要了解有关激活功能的更多信息，[请参阅本文](https://developers.google.com/machine-learning/crash-course/introduction-to-neural-networks/anatomy)。

看看是否可以使模型产生如下图所示的输出:

![](https://codelabs.developers.google.com/codelabs/tfjs-training-regression/img/a21c5e6537cf81d.png)
