---
title: 'Worth to read papers'
date: 2025-08-01
permalink: /posts/2025/08/papers/
tags:
  - deep learning
  - papers
  - generative models
  - math
---
*Compilation of some papers that I enjoyed reading.*

# ([2504.16929](https://arxiv.org/abs/2504.16929)) I‑Con: A Unifying Framework for Representation Learning 

Proposes a single equation aiming to unify diverse machine learning approaches: clustering, contrastive learning, supervised learning, and dimensionality reduction. The method is fundamentally based on the idea that each ML model is optimizing a loss function based on the KL divergence between two data distributions, *p* and *q*. Where *p* represents the probability density of the true data and *q* the learned model distribution.

"Universal" loss function:

$$\mathcal{L}(\theta, \phi) = \int_i \text{D}_\text{KL}(p_\theta(\cdot \mid i)\mid\mid q_\phi(\cdot \mid i))$$

This framework aspires to act as a “periodic table of machine learning”, suggesting that the current gaps within this formulation may inspire new model types or architectural innovations.

![Periodic Table of Machine Learning](/images/papers/icon-table.png)



# ([2006.11239](https://arxiv.org/abs/2006.11239)) Denoising Diffusion Probabilistic Models

This is a classic paper in generative models, introduces diffusion models (well, there was a previous paper in [2015](https://arxiv.org/abs/1503.03585)). Diffusion models are trained for removing Gaussian noise, the main idea is a model that gradually transforms a Gaussian noise image into an actual image.  

The paper has a strong mathematical background, I have a [blog entry with notes of diffusion models](/posts/2025/08/diffusion/).  

![Example of diffusion](/images/diffusion/diffusion_subplots.png)
*Example of diffusion, over 500 steps the gaussian noise image becomes to an image*
