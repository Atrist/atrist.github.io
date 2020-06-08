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

因为我们正在训练一个模型来预测连续数，所以此任务有时称为回归任务。我们将通过显示许多输入示例以及正确的输出来训练模型。这被称为监督学习。
