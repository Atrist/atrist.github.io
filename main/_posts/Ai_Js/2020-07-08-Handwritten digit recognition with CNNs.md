---
title: Handwritten digit recognition with CNNs
date: 2020-7-08
tags:
  - js
  - Ai
summary: TensorFlow的官方项目-- 带有CNN的手写数字识别
---

## 参考资料

- [TensorFlow 官方 带有 CNN 的手写数字识别的教程](https://codelabs.developers.google.com/codelabs/tfjs-training-classfication/index.html#0)

## 1. 介绍

在本教程中，我们将构建一个 TensorFlow.js 模型来使用卷积神经网络识别手写数字。首先，我们将通过分类器“观察”数千个手写数字图像及其标签来训练分类器。然后，我们将使用模型从未见过的测试数据来评估分类器的准确性。

该任务被视为分类任务，因为我们正在训练模型以将类别（出现在图像中的数字）分配给输入图像。我们将通过显示许多输入示例以及正确的输出来训练模型。这被称为[监督学习](https://developers.google.com/machine-learning/problem-framing/cases)。

### 你将会做什么

您将创建一个使用 TensorFlow.js 在浏览器中训练模型的网页。给定特定尺寸的黑白图像，它将对出现在图像中的数字进行分类。涉及的步骤是：

1. 加载数据。
2. 定义模型的架构。
3. 训练模型并在训练时监视其性能。
4. 通过做出一些预测来评估训练后的模型。

### 你将学到什么

- TensorFlow.js 语法，用于使用 TensorFlow.js Layers API 创建卷积模型。
- 在 TensorFlow.js 中制定分类任务
- 如何使用 tfjs-vis 库监视浏览器内训练。

## 2. 开始
### 创建一个HTML页面并包含JavaScript
将以下代码复制到一个名为`index.html`的`html`文件中
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TensorFlow.js Tutorial</title>

  <!-- Import TensorFlow.js -->
  <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js"></script>
  <!-- Import tfjs-vis -->
  <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-vis@1.0.2/dist/tfjs-vis.umd.min.js"></script>

  <!-- Import the data file -->
  <script src="data.js" type="module"></script>

  <!-- Import the main script file -->
  <script src="script.js" type="module"></script>

</head>

<body>
</body>
</html>
```
### 为数据和代码创建JavaScript文件
1. 在与上述HTML文件相同的文件夹中，创建一个名为`data.js`的文件，并将内容从[该链接](https://storage.googleapis.com/tfjs-tutorials/mnist_data.js)复制到该文件中。

2. 在与第一步相同的文件夹中，创建一个名为`script.js`的文件，并将以下代码放入其中。
    ```js
    console.log('Hello TensorFlow');
    ```
#### NOTE
根据浏览器的权限，您可能需要使用本地Web服务器来查看文件，以便避开CORS限制。

[Node http server](https://www.npmjs.com/package/http-server)是个不错的选择。
### 测试
如果一切正常，则应该创建两个全局变量。 tf是对TensorFlow.js库的引用，tfvis是对tfjs-vis库的引用。

您应该看到一条消息“ Hello TensorFlow”，如果是这样，则准备继续进行下一步。

## 3. 加载数据
在本教程中，您将训练模型以学习识别图像中的数字，如下图所示。这些图像是来自称为[MNIST](http://yann.lecun.com/exdb/mnist/)的数据集的28x28px灰度图像。

![](https://codelabs.developers.google.com/codelabs/tfjs-training-classfication/img/c01d85004462fd48.png)![](https://codelabs.developers.google.com/codelabs/tfjs-training-classfication/img/58d4cf23ee7202be.png)![](https://codelabs.developers.google.com/codelabs/tfjs-training-classfication/img/8998bab63049c12a.png)

我们提供了用于从为您创建的特殊[Sprite文件](https://storage.googleapis.com/learnjs-data/model-builder/mnist_images.png)（〜10MB）中加载这些图像的代码，以便我们可以专注于训练部分。

随时研究[data.js](https://raw.githubusercontent.com/tensorflow/tfjs-examples/master/mnist-core/data.js)文件以了解如何加载数据。或者，一旦完成本教程，就可以创建自己的加载数据的方法。

提供的代码包含一个具有两个公共方法的`MnistData`类：
- `nextTrainBatch（batchSize）`：从训练集中返回图像及其标签的随机批次。 
- `nextTestBatch（batchSize）`：从测试集中返回一批图像及其标签

MnistData类还执行**重排**和**规范化**数据的重要步骤。

总共有65,000张图像，我们将使用多达55,000张图像来训练模型，完成后可以保存10,000张图像以测试模型的性能。我们将在浏览器中完成所有这些工作！

>如果您在`Node.js`中执行类似操作，则可能会直接从文件系统加载图像，并使用本机图像处理解决方案来获取像素数据。

让我们加载数据并测试其是否正确加载。


**将以下代码添加到您的script.js文件中。**
```js
import {MnistData} from './data.js';

async function showExamples(data) {
  // Create a container in the visor
  const surface =
    tfvis.visor().surface({ name: 'Input Data Examples', tab: 'Input Data'});  

  // Get the examples
  const examples = data.nextTestBatch(20);
  const numExamples = examples.xs.shape[0];
  
  // Create a canvas element to render each example
  for (let i = 0; i < numExamples; i++) {
    const imageTensor = tf.tidy(() => {
      // Reshape the image to 28x28 px
      return examples.xs
        .slice([i, 0], [1, examples.xs.shape[1]])
        .reshape([28, 28, 1]);
    });
    
    const canvas = document.createElement('canvas');
    canvas.width = 28;
    canvas.height = 28;
    canvas.style = 'margin: 4px;';
    await tf.browser.toPixels(imageTensor, canvas);
    surface.drawArea.appendChild(canvas);

    imageTensor.dispose();
  }
}

async function run() {  
  const data = new MnistData();
  await data.load();
  await showExamples(data);
}

document.addEventListener('DOMContentLoaded', run);
```
刷新页面，几秒钟后，您应该会在左侧看到一个包含大量图像的面板。

![](https://codelabs.developers.google.com/codelabs/tfjs-training-classfication/img/6dff857738b54eed.png)

## 4. 概念化我们的任务
我们的输入数据如下所示。

![](https://codelabs.developers.google.com/codelabs/tfjs-training-classfication/img/6dff857738b54eed.png)

我们的目标是训练一个将拍摄一张图像的模型，并学习预测该图像可能属于的10个类别中的每个类别的得分（数字0-9）。

每个图像宽28像素，高28像素，并具有1个颜色通道，因为它是灰度图像。因此，每个图像的形状为`[28，28，1]`。

请记住，我们要进行一对一的映射以及每个输入示例的形状，因为这对于下一节很重要。

## 5. 定义模型架构
在本节中，我们将编写代码来描述模型架构。模型体系结构是一种说法：“模型在执行时将运行哪些功能”，或者“模型将使用哪种算法来计算其答案”。在机器学习中，我们定义一种架构（或算法），并让训练过程学习该算法的参数。

**将以下函数添加到您的`script.js`文件中以定义模型架构**
```js
function getModel() {
  const model = tf.sequential();
  
  const IMAGE_WIDTH = 28;
  const IMAGE_HEIGHT = 28;
  const IMAGE_CHANNELS = 1;  
  
  // In the first layer of our convolutional neural network we have 
  // to specify the input shape. Then we specify some parameters for 
  // the convolution operation that takes place in this layer.
  model.add(tf.layers.conv2d({
    inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
    kernelSize: 5,
    filters: 8,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }));

  // The MaxPooling layer acts as a sort of downsampling using max values
  // in a region instead of averaging.  
  model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));
  
  // Repeat another conv2d + maxPooling stack. 
  // Note that we have more filters in the convolution.
  model.add(tf.layers.conv2d({
    kernelSize: 5,
    filters: 16,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }));
  model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));
  
  // Now we flatten the output from the 2D filters into a 1D vector to prepare
  // it for input into our last layer. This is common practice when feeding
  // higher dimensional data to a final classification output layer.
  model.add(tf.layers.flatten());

  // Our last layer is a dense layer which has 10 output units, one for each
  // output class (i.e. 0, 1, 2, 3, 4, 5, 6, 7, 8, 9).
  const NUM_OUTPUT_CLASSES = 10;
  model.add(tf.layers.dense({
    units: NUM_OUTPUT_CLASSES,
    kernelInitializer: 'varianceScaling',
    activation: 'softmax'
  }));

  
  // Choose an optimizer, loss function and accuracy metric,
  // then compile and return the model
  const optimizer = tf.train.adam();
  model.compile({
    optimizer: optimizer,
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });

  return model;
}
```
让我们更详细地看一下。

### 卷积
```js
model.add(tf.layers.conv2d({
  inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
  kernelSize: 5,
  filters: 8,
  strides: 1,
  activation: 'relu',
  kernelInitializer: 'varianceScaling'
}));
```
在这里，我们使用顺序模型。我们使用的是conv2d层而不是密集层。我们无法深入了解卷积如何工作的所有细节，但是这里有一些资源可以解释底层操作：
- [Image Kernels Explained Visually](http://setosa.io/ev/image-kernels/)
- [Convolutional Neural Networks for Visual Recognition](http://cs231n.github.io/convolutional-networks/)

让我们分解一下`conv2d`的配置对象中的每个参数：
- `inputShape`:流入模型第一层的数据的形状。在这种情况下，我们的MNIST示例为28x28像素的黑白图像。图像数据的规范格式为`[行，列，深度]`，因此在这里我们要配置形状为`[28、28、1]`。每个维度中的像素数为28行和列，深度为1，因为我们的图像只有1个颜色通道。请注意，我们没有在输入形状中指定批次大小。图层被设计为与批量大小无关，因此在推理期间，您可以传入任何批量大小的张量。
- `kernelSize`: 滑动卷积滤波器窗口的大小将应用于输入数据。在这里，我们将`kernelSize`设置为5，它指定一个正方形的5x5卷积窗口。
- `filters`:要应用于输入数据的大小为`kernelSize`的过滤器窗口数。在这里，我们将对数据应用8个过滤器。
- `strides`: 滑动窗口的“步长”，即滤镜每次在图像上移动时将移动多少像素。在此，我们将步幅指定为1，这表示滤镜将以1像素为步长在图像上滑动。
- `activation`:卷积完成后应用于数据的[激活函数](https://developers.google.com/machine-learning/glossary/#activation_function)。在这种情况下，我们将应用[整流线性单元（ReLU）](https://developers.google.com/machine-learning/glossary/#ReLU)，这是ML模型中非常常见的激活函数。
- `kernelInitializer`:用于随机初始化模型权重的方法，这对于训练动力学非常重要。在这里我们将不讨论初始化的详细信息，但是VarianceScaling（在此使用）通常是不错的[初始化选择](https://js.tensorflow.org/api/latest/#Initializers)。

>您也可以只使用密集层来构建图像分类器，但是，卷积层已被证明对许多基于图像的任务有效。

### 展平我们的数据表示
```js
model.add(tf.layers.flatten());
```
图像是高维数据，卷积操作往往会增加进入其中的数据的大小。在将它们传递到最终分类层之前，我们需要将数据展平为一个长数组。密集层（我们用作最后​​一层）仅需使用`tensor1d`，因此此步骤在许多分类任务中很常见。

>注意：在平整层中没有权重。它只是将其输入展开为一个长数组。

### 计算我们的最终概率分布
```js
const NUM_OUTPUT_CLASSES = 10;
model.add(tf.layers.dense({
  units: NUM_OUTPUT_CLASSES,
  kernelInitializer: 'varianceScaling',
  activation: 'softmax'
}));
```
我们将使用具有`softmax`激活的密集层来计算10种可能类别上的概率分布。得分最高的班级将是预测的数字。

>记住，我们想要一比十的映射（一个输入图像到十个概率）。这就是为什么我们的输出层有10个单位的原因。 <br/>
>您可能希望在分类任务的最后一层使用`Softmax`激活。

### 选择一个优化器和损失函数
```js
const optimizer = tf.train.adam();
model.compile({
  optimizer: optimizer,
  loss: 'categoricalCrossentropy',
  metrics: ['accuracy'],
});
```

我们编译模型，指定要跟踪的[优化程序](https://developers.google.com/machine-learning/glossary/#optimizer)，[损失函数](https://developers.google.com/machine-learning/glossary/#optimizer)和指标。

与我们的第一个教程相反，这里我们使用[categoricalCrossentropy](https://developers.google.com/machine-learning/glossary/#cross-entropy)作为损失函数。顾名思义，当我们的模型输出是概率分布时，将使用此名称。


例如，如果我们的数字确实代表7，那么我们可能会得到以下结果

| Index      | 0   | 1    | 2    | 3    | 4    | 5    | 6    | 7    | 8    | 9    |
| ---------- | --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| True Label | 0   | 0    | 0    | 0    | 0    | 0    | 0    | 1    | 0    | 0    |
| Prediction | 0.1 | 0.01 | 0.01 | 0.01 | 0.20 | 0.01 | 0.01 | 0.60 | 0.03 | 0.02 |

分类交叉熵将产生一个数字，指示预测矢量与我们的真实标签矢量有多相似。

此处用于标签的数据表示称为**单热编码**，在分类问题中很常见。对于每个示例，每个类别都有与之关联的概率。当我们确切知道应该是什么时，可以将该概率设置为1，将其他概率设置为0。有关单热编码的更多信息，请参见[此页面](https://developers.google.com/machine-learning/crash-course/representation/feature-engineering)。

我们将监视的另一个指标是`准确性`，对于分类问题，`准确性`是所有预测中正确预测的百分比。
## 训练模型
将以下函数复制到您的script.js文件中。
```js
async function train(model, data) {
  const metrics = ['loss', 'val_loss', 'acc', 'val_acc'];
  const container = {
    name: 'Model Training', styles: { height: '1000px' }
  };
  const fitCallbacks = tfvis.show.fitCallbacks(container, metrics);
  
  const BATCH_SIZE = 512;
  const TRAIN_DATA_SIZE = 5500;
  const TEST_DATA_SIZE = 1000;

  const [trainXs, trainYs] = tf.tidy(() => {
    const d = data.nextTrainBatch(TRAIN_DATA_SIZE);
    return [
      d.xs.reshape([TRAIN_DATA_SIZE, 28, 28, 1]),
      d.labels
    ];
  });

  const [testXs, testYs] = tf.tidy(() => {
    const d = data.nextTestBatch(TEST_DATA_SIZE);
    return [
      d.xs.reshape([TEST_DATA_SIZE, 28, 28, 1]),
      d.labels
    ];
  });

  return model.fit(trainXs, trainYs, {
    batchSize: BATCH_SIZE,
    validationData: [testXs, testYs],
    epochs: 10,
    shuffle: true,
    callbacks: fitCallbacks
  });
}
```
然后将以下代码添加到您的`run`函数中。
```js
const model = getModel();
tfvis.show.modelSummary({name: 'Model Architecture'}, model);
  
await train(model, data);
```
刷新页面，几秒钟后，您应该会看到一些图形报告培训进度。

![](https://codelabs.developers.google.com/codelabs/tfjs-training-classfication/img/a2c7628dc47d465.png)


让我们更详细地看一下。

### 监控指标
```js
const metrics = ['loss', 'val_loss', 'acc', 'val_acc'];
```
在这里，我们决定要监视哪些指标。我们将监视训练集的损失和准确性以及验证集的损失和准确性（分别为val_loss和val_acc）。我们将在下面详细讨论验证集。

>切记：使用Layers API时，每批都会计算损失，而每个时期后都会对整个数据集计算准确性。

### 准备数据作为张量
```js
const BATCH_SIZE = 512;
const TRAIN_DATA_SIZE = 5500;
const TEST_DATA_SIZE = 1000;

const [trainXs, trainYs] = tf.tidy(() => {
  const d = data.nextTrainBatch(TRAIN_DATA_SIZE);
  return [
    d.xs.reshape([TRAIN_DATA_SIZE, 28, 28, 1]),
    d.labels
  ];
});

const [testXs, testYs] = tf.tidy(() => {
  const d = data.nextTestBatch(TEST_DATA_SIZE);
  return [
    d.xs.reshape([TEST_DATA_SIZE, 28, 28, 1]),
    d.labels
  ];
});
```
在这里，我们创建了两个数据集，一个训练集，我们将在该训练集上训练模型，一个验证集，我们将在每个时期结束时对其进行测试，但是在训练过程中，验证集中的数据永远不会显示给模型。

我们提供的数据类使从图像数据中轻松获得张量变得容易。但是我们仍然可以将张量整形为模型期望的形状，例如`[num_examples，image_width，image_height，channels]`，然后才能将它们输入模型。对于每个数据集，我们都有输入（Xs）和标签（Ys）。

>注意：trainDataSize设置为5500，testDataSize设置为1000，以使其更快地进行实验。一旦运行了本教程，就可以将其分别增加到55000和10000。训练将花费更长的时间，但仍然可以在许多机器的浏览器中使用。
```js
return model.fit(trainXs, trainYs, {
  batchSize: BATCH_SIZE,
  validationData: [testXs, testYs],
  epochs: 10,
  shuffle: true,
  callbacks: fitCallbacks
});
```
我们调用`model.fit`开始训练循环。我们还传递了`validationData`属性，以指示模型在每个时期之后应使用哪些数据来进行自我测试（但不用于训练）。

如果我们在训练数据上做得很好，但在验证数据上做得不好，则意味着该模型可能[过度适合](https://developers.google.com/machine-learning/glossary/#overfitting)了训练数据，并且无法很好地[推广](https://developers.google.com/machine-learning/glossary/#generalization)到以前从未见过的输入。

## 7.评估我们的模型
验证准确性可以很好地估计我们的模型将如何处理之前从未见过的数据（只要该数据在某种程度上类似于验证集）。但是，我们可能需要更详细的分类信息。

tfjs-vis中有两种方法可以帮助您解决此问题。

**将以下代码添加到`script.js`文件的底部**
```js
const classNames = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

function doPrediction(model, data, testDataSize = 500) {
  const IMAGE_WIDTH = 28;
  const IMAGE_HEIGHT = 28;
  const testData = data.nextTestBatch(testDataSize);
  const testxs = testData.xs.reshape([testDataSize, IMAGE_WIDTH, IMAGE_HEIGHT, 1]);
  const labels = testData.labels.argMax(-1);
  const preds = model.predict(testxs).argMax(-1);

  testxs.dispose();
  return [preds, labels];
}


async function showAccuracy(model, data) {
  const [preds, labels] = doPrediction(model, data);
  const classAccuracy = await tfvis.metrics.perClassAccuracy(labels, preds);
  const container = {name: 'Accuracy', tab: 'Evaluation'};
  tfvis.show.perClassAccuracy(container, classAccuracy, classNames);

  labels.dispose();
}

async function showConfusion(model, data) {
  const [preds, labels] = doPrediction(model, data);
  const confusionMatrix = await tfvis.metrics.confusionMatrix(labels, preds);
  const container = {name: 'Confusion Matrix', tab: 'Evaluation'};
  tfvis.render.confusionMatrix(
      container, {values: confusionMatrix}, classNames);

  labels.dispose();
}
```
这段代码在做什么？ 
- 做出预测。 
- 计算准确性指标。 
- 显示指标 

让我们仔细看看每个步骤。

### 作出预测
```js
function doPrediction(model, data, testDataSize = 500) {
  const IMAGE_WIDTH = 28;
  const IMAGE_HEIGHT = 28;
  const testData = data.nextTestBatch(testDataSize);
  const testxs = testData.xs.reshape([testDataSize, IMAGE_WIDTH, IMAGE_HEIGHT, 1]);
  const labels = testData.labels.argMax(-1);
  const preds = model.predict(testxs).argMax(-1);

  testxs.dispose();
  return [preds, labels];
}  
```
首先，我们需要做出一些预测。在这里，我们将拍摄500张图像并预测其中的位数（您可以稍后增加此数字以测试更大的图像集）。值得注意的是，`argmax`函数为我们提供了最高概率类别的索引。请记住，模型为每个类别输出一个概率。在这里，我们找出最高的概率并将其用作预测。

您可能还会注意到，我们可以一次对所有500个示例进行预测。这就是`TensorFlow.js`提供的矢量化功能。

>**Note**:注意：此处我们不使用任何概率阈值。即使是相对较低的值，我们也会取最高值。此项目的一个有趣扩展是设置一些所需的最小概率，如果没有班级达到此分类阈值，则指示“未找到数字”。

>**doPredictions**:显示了模型训练后通常如何进行预测。但是，对于新数据，您将没有任何现有标签

### 显示每一个指标的准确性
```js
async function showAccuracy() {
  const [preds, labels] = doPrediction();
  const classAccuracy = await tfvis.metrics.perClassAccuracy(labels, preds);
  const container = { name: 'Accuracy', tab: 'Evaluation' };
  tfvis.show.perClassAccuracy(container, classAccuracy, classNames);

  labels.dispose();
}  
```
使用一组预测和标签，我们可以计算每个类别的准确性。

### 显示混乱矩阵
```js
async function showConfusion() {
  const [preds, labels] = doPrediction();
  const confusionMatrix = await tfvis.metrics.confusionMatrix(labels, preds);
  const container = { name: 'Confusion Matrix', tab: 'Evaluation' };
  tfvis.render.confusionMatrix(
      container, {values: confusionMatrix}, classNames);

  labels.dispose();
}  
```
混淆矩阵类似于每个指标的准确度，但会进一步细分以显示错误分类的模式。它使您可以查看模型是否对任何特定的指标对感到困惑。

### 显示评估
将以下代码添加到`run`函数的底部以显示评估。
```js
await showAccuracy(model, data);
await showConfusion(model, data);
```
您应该看到如下所示的显示。

![](https://codelabs.developers.google.com/codelabs/tfjs-training-classfication/img/82458197bd5e7f52.png)

## 8.主要要点
预测输入数据的类别称为分类任务。 

分类任务要求标签具有适当的数据表示形式
- 标签的常见表示形式包括类别的一键编码
准备数据：
- 将一些在训练期间从未见过的数据放在一边，这对于您可以用来评估模型很有用。这称为验证集。

构建并运行模型：
- 卷积模型已显示在图像任务上表现良好。
- 分类问题通常使用分类交叉熵作为其损失函数。
- 监视训练以查看损失是否正在减少并且准确性正在增加。

评估模型
- 一旦训练了模型以决定要解决的初始问题的性能如何，就可以决定评估模型的方式。
- 每类准确性和混淆矩阵可以为您提供比整体准确性更好的模型性能细分。
