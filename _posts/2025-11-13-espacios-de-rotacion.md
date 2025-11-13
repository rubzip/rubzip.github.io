---
title: 'Robótica. Tema 0: Espacios de Rotación'
date: 2025-11-13
permalink: /posts/2025/11/t0rotacion/
tags:
  - robotics
  - kinematics
  - math
---

# Tema 0: Introducción a los Espacios de Rotación

## 0.1 Conjunto de simetría en 3 dimensiones (O(3))

Se define el conjunto $$O(3) =\{R\in\mathbb{R}^{3\times3}\}$$ como el conjunto de operaciones que satisfacen:

$$R R^T = I, \quad \forall R \in O(3)$$

donde $$I$$ es la matriz identidad $$3\times3$$.

---

### Propiedades

**Propiedad 1: Determinante**

$$
\det(R) = \pm 1
\forall R \in O(3)
$$


**Demostración:**

$$
\det(R R^T) = \det(I) = 1
$$

$$
\det(R R^T) = \det(R) \cdot \det(R^T) = \det(R)^2 = 1
$$

$$
\det(R) = \pm 1
$$
El determinante no puede ser un numero complejo ya que R está definido sobre $\mathbb{R}^{3\times3}$.

---

**Propiedad 2: Conservación del módulo**

$$
\left\| R u \right\| = \left\| u\right\| \forall u \in \mathbb{R}^3
$$

**Demostración:**

$$
\left\| R u \right\|^2 = (R u)^T (R u) = u^T R^T R u = u^T I u = u^T u = \left\| u \right\|^2
$$

$$
\left\| R u \right\| = \left\| u \right\|
$$

---

**Propiedad 3: Conservación del ángulo**
$$
\widehat{u v} = \widehat{u' v'} \forall u, v \in \mathbb{R}^3
$$

$$
u' = R u
$$

$$
v' = R v
$$

**Demostración:**

$$
\cos \theta' = \frac{u'v'}{\left\| u'\right\|\left\| v'\right\|} = \frac{RR^Tuv}{\left\| Ru\right\|\left\| Rv\right\|} = \frac{uv}{\left\| u\right\|\left\| v\right\|} = \cos \theta
$$

---

## 0.2 Subconjuntos de O(3)

El conjunto $$O(3)$$ puede dividirse en dos subconjuntos según el valor del determinante de sus transformaciones:

1. **Transformaciones con $\det(R) = 1$**
2. **Transformaciones con $\det(R) = -1$**

---

### Transformaciones con $$\det(R) = -1$$

Estas operaciones cumplen todas las propiedades de $$O(3)$$, **pero no preservan la orientación**.

**Ejemplo:**

$$
\begin{pmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & -1 \\
\end{pmatrix} \begin{pmatrix}
x \\
y \\
z
\end{pmatrix} = \begin{pmatrix}
x \\
y \\
-z
\end{pmatrix}
$$

Esta transformación invierte la dimensión $$z$$, cambiando la orientación del sistema de coordenadas.

---

## 0.3 Subconjunto SO(3)

Se define como el subconjunto de $$O(3)$$ cuyas matrices tienen determinante $$+1$$:

$$
SO(3) = \{ R \in O(3) \mid \det(R) = 1 \}
$$


Este subconjunto es el más relevante para **rotaciones en robótica**, ya que representa todas las rotaciones puras en $$\mathbb{R}^3$$ sin reflejar el sistema de coordenadas.

---

### Diagonalización

Sea $$R \in SO(3)$$. La diagonalización formal implica que existen vectores propios $$u \in \mathbb{R}^3$$ y valores propios $$\lambda$$ tales que:

$$
R u = \lambda u
$$

Los valores propios cumplen:

$$
\det(R) = \lambda_1 \lambda_2 \lambda_3 = 1
$$

Además, dado que $$R$$ conserva el módulo de cualquier vector:

$$
\left\| R u \right\| = \left\| u\right\|
$$
$$
\det{R} \left\| u\right\| = \left | \lambda \right | \left\| u\right\|
$$

Lo que implica:

$$
|\lambda| = 1
$$

Por lo tanto, **todos los valores propios de $$R \in SO(3)$$ tienen módulo 1**.

---

### Propiedades de los autovalores de $$R \in SO(3)$$

Si $$\lambda \in \mathbb{C}$$ es un autovalor con vector propio $$u$$:

$$
R u = \lambda u
$$

Como $$R$$ es real:

$$
(R u)^* = (\lambda u)^* \implies R (u^*) = \lambda^* u^*
$$

Si un autovalor es complejo, su conjugado también lo es. Además:

$$
|\lambda| = 1 \implies \lambda_1 = e^{i\theta}, \quad \lambda_2 = e^{-i\theta}
$$

Como $$\det(R) = 1$$:

$$
\det(R) = \lambda_1 \lambda_2 \lambda_3 = 1 \implies \lambda_3 = 1
$$

**Conclusión:**
Toda matriz de $$SO(3)$$ tiene **un autovalor igual a 1**, y los otros dos forman un par de conjugados $$e^{\pm i \theta}$$, representando rotación alrededor de un eje.

---

### Grados de libertad de SO(3)

Los operadores $$R \in SO(3)$$ se definen a partir del conjunto de autovalores:
$$
\lambda = \{ e^{i\theta}, e^{-i\theta}, 1 \}, \quad \theta \in [0, 2\pi)
$$

**SO(3) tiene 3 grados de libertad:**

1. Ángulo de rotación $$\theta$$ (1 grado de libertad)
2. El vector normal que define el eje de rotación (2 grados de libertad)

**Ejemplo:**
Para un ángulo $\theta$ cualquiera pueden definirse los 6 operadores:
$$
D_1 = \begin{bmatrix} e^{i\theta} & 0 & 0 \\ 0 & e^{-i\theta} & 0 \\ 0 & 0 & 1 \end{bmatrix},
D_2 = \begin{bmatrix} e^{i\theta} & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & e^{-i\theta} \end{bmatrix},
D_3 = \begin{bmatrix} e^{-i\theta} & 0 & 0 \\ 0 & e^{i\theta} & 0 \\ 0 & 0 & 1 \end{bmatrix}
$$
$$
D_4 = \begin{bmatrix} e^{-i\theta} & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & e^{i\theta} \end{bmatrix}, 
D_5 = \begin{bmatrix} 1 & 0 & 0 \\ 0 & e^{i\theta} & 0 \\ 0 & 0 & e^{-i\theta} \end{bmatrix}, 
D_6 = \begin{bmatrix} 1 & 0 & 0 \\ 0 & e^{-i\theta} & 0 \\ 0 & 0 & e^{i\theta} \end{bmatrix}.
$$


---

## 0.4 Ángulos de Euler
Como queda demostrado el subconjunto de rotaciones en $$\mathbb{R}^3$$ cuenta con 3 grados de libertad. Los **ángulos de Euler** parametrizan rotaciones en $$\mathbb{R}^3$$ usando tres ángulos independientes. Permiten expresar cualquier $$R \in SO(3)$$ como el producto de tres rotaciones elementales.

### Convención Z-Y-Z
La selección de los ejes de rotación es completamente arbitraria, una de las más utilizadas es la conocida como Z-Y-Z que consiste en:
$$
R = R_z(\phi) , R_y(\theta) , R_z(\psi)
$$

donde:

* $$R_z(\phi)$$: rotación alrededor del eje $$z$$ de ángulo $\phi$
* $$R_y(\theta)$$: rotación alrededor del eje $$y$$ de ángulo $\theta$
* $$R_z(\psi)$$: rotación alrededor del eje $$z$$ de ángulo $\psi$

---

### Propiedades

1. **Representación completa:** cualquier $$R \in SO(3)$$ puede escribirse como combinación de tres rotaciones elementales.
2. **Grados de libertad:** los tres ángulos de Euler $$(\phi, \theta, \psi)$$ representan los **tres grados de libertad** de $$SO(3)$$.
3. **Composición de rotaciones:** multiplicar matrices corresponde a aplicar secuencialmente las rotaciones.
