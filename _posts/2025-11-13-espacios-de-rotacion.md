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

**Propiedad 1: Determinante**

$$
\det(R) = \pm 1 \quad
\forall R \in O(3)
$$


**Demostración:**

$$
\det(R R^T) = \det(I) = 1
$$

$$
\det(R R^T) = \det(R) \det(R^T) = \det(R)^2 = 1
$$

$$
\det(R) = \pm 1
$$

El determinante no puede ser un numero complejo ya que R está definido sobre $$\mathbb{R}^{3\times3}$$.

---

**Propiedad 2: Conservación del módulo**

$$
\left\| R u \right\| = \left\| u\right\| \quad \forall u \in \mathbb{R}^3
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
\widehat{u v} = \widehat{u' v'} \quad \forall u, v \in \mathbb{R}^3
$$

$$
u' = R u
$$

$$
v' = R v
$$

**Demostración:**

$$
\cos \theta' = \frac{u'v'}{\left\| u'\right\|\left\| v'\right\|} = \frac{uR^TRv}{\left\| Ru\right\|\left\| Rv\right\|} = \frac{uv}{\left\| u\right\|\left\| v\right\|} = \cos \theta
$$

---

## 0.2 Subconjuntos de O(3)

El conjunto $$O(3)$$ puede dividirse en dos subconjuntos según el valor del determinante de sus transformaciones:

1. **Transformaciones con $$\det(R) = 1$$**
2. **Transformaciones con $$\det(R) = -1$$**

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

Esta transformación invierte la dimensión $$z$$, cambiando la orientación del sistema de coordenadas. Por esto no pueden ser usadas en robótica.

---

## 0.3 Subconjunto SO(3)

Se define como el subconjunto de $$O(3)$$ cuyas matrices tienen determinante $$+1$$:

$$
SO(3) = \{ R \in O(3) \mid \det(R) = 1 \}
$$


Este subconjunto es el más relevante para **rotaciones en robótica**, ya que representa todas las rotaciones puras en $$\mathbb{R}^3$$ sin reflejar el sistema de coordenadas.

---

### Diagonalización

La diagonalización formal implica que existen vectores propios $$u \in \mathbb{R}^3$$ y valores propios $$\lambda$$ tales que:

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


---

## 0.4 Ángulos de Euler
Como queda demostrado el subconjunto de rotaciones en $$\mathbb{R}^3$$ cuenta con 3 grados de libertad. Los **ángulos de Euler** parametrizan rotaciones en $$\mathbb{R}^3$$ usando tres ángulos independientes. Permiten expresar cualquier $$R \in SO(3)$$ como el producto de tres rotaciones elementales.

### Convención Z-Y-Z
La selección de los ejes de rotación es completamente arbitraria, una de las más utilizadas es la conocida como Z-Y-Z que consiste en:

$$
R = R_z(\phi) \cdot R_y(\theta) \cdot R_z(\psi)
$$

donde:

* $$R_z(\phi)$$: rotación alrededor del eje $$z$$ de ángulo $$\phi$$
* $$R_y(\theta)$$: rotación alrededor del eje $$y$$ de ángulo $$\theta$$
* $$R_z(\psi)$$: rotación alrededor del eje $$z$$ de ángulo $$\psi$$

---

### Propiedades

1. **Representación completa:** cualquier $$R \in SO(3)$$ puede escribirse como combinación de tres rotaciones elementales.
2. **Grados de libertad:** los tres ángulos de Euler $$(\phi, \theta, \psi)$$ representan los **tres grados de libertad** de $$SO(3)$$.
3. **Composición de rotaciones:** multiplicar matrices corresponde a aplicar secuencialmente las rotaciones.
4. 
## 0.5 Problema de los Ángulos de Euler: *Gimbal Lock*

Los ángulos de Euler son una herramienta muy útil para describir rotaciones en $$\mathbb{R}^3$$.  
Permiten parametrizar cualquier matriz $$R \in SO(3)$$ mediante tres ángulos.  
Sin embargo, **no son una representación perfecta** y presentan limitaciones importantes.  

La más conocida es el fenómeno llamado **gimbal lock**.

---

### ¿Qué es el *gimbal lock*?

El *gimbal lock* ocurre cuando, debido a la combinación de dos de las rotaciones, **dos planos de rotación se vuelven paralelos**, haciendo que se pierda uno de los tres grados de libertad.

En el caso de la parametrización de Euler **Z–Y–Z** o **Z–Y–X**, este problema aparece cuando:

$$
\cos\theta = 0
$$

que equivale a:

$$
\theta = \frac{\pi}{2} \quad \text{o} \quad \theta = -\frac{\pi}{2}
$$

---

### Demostración mediante el Jacobiano

Sea $$R(\phi, \theta, \psi)$$ la matriz de rotación en ángulos de Euler.  
El Jacobiano respecto a los tres parámetros está dado por:

$$
J = 
\begin{pmatrix}
\frac{\partial R}{\partial \phi} &
\frac{\partial R}{\partial \theta} &
\frac{\partial R}{\partial \psi}
\end{pmatrix}
$$

El determinante del Jacobiano representa la **capacidad de los tres ángulos para generar variaciones independientes de orientación**.

En particular, en las parametrizaciones comunes se cumple que:

$$
\det(J) = \cos\theta
$$

Por tanto:

$$
\cos\theta = 0 \quad \Rightarrow \quad \det(J) = 0
$$

Cuando el determinante es cero, el Jacobiano **pierde rango**, lo que significa que **las variaciones de los tres ángulos ya no generan tres grados de libertad independientes**.

En ese punto, el sistema pasa de tener 3 grados de libertad a tener solo 2.

---

### Intuición geométrica

Cuando $$\theta = \pm \frac{\pi}{2}$$, las rotaciones alrededor de los ejes externos e internos (por ejemplo, $$\phi$$ y $$\psi$$) se alinean y producen rotaciones equivalentes.  
En otras palabras:

- Girar con $$\phi$$ produce exactamente la misma rotación que girar con $$\psi$$.  
- El sistema pierde un eje independiente.

El mecanismo físico equivalente son **tres anillos cardán (gimbals)**, donde dos de ellos quedan alineados, anulando uno de los grados de libertad.

![Gimball](https://upload.wikimedia.org/wikipedia/commons/5/5a/Gimbal_3_axes_rotation.gif)

---

### *Gimbal lock* en la misión Apolo 11

El fenómeno del *gimbal lock* afectó de manera real a sistemas de navegación durante décadas, especialmente en misiones espaciales.

En el **Apolo 11**, la plataforma de navegación inercial utilizaba un sistema de **tres gimbals** para mantener la orientación de la nave.  
Los ingenieros sabían que si la nave alcanzaba una orientación cercana al *gimbal lock*, el sistema perdería un grado de libertad y quedaría prácticamente “ciego” a ciertas rotaciones.

Durante la misión, al descender hacia la Luna, Neil Armstrong y Buzz Aldrin fueron advertidos **varias veces** de evitar maniobras que llevaran la plataforma a la región crítica donde:

$$
\theta \approx \pm 90^\circ
$$

Si el sistema hubiera entrado en *gimbal lock* durante el descenso, habría sido necesario **reinicializar toda la plataforma inercial**, un proceso lento y peligroso que habría obligado a abortar el alunizaje.

After the Lunar Module had landed, Mike Collins aboard the Command Module joked "How about sending me a fourth gimbal for Christmas?"

### En robótica
El Gimbal lock también afecta en robótica y es conocido como *wrist flip* o *robot sigularities* que son problemas relacionados con este tipo de direcciones en las que los brazos robóticos no pierden predicibilidad.


---

### Conclusión

- Los ángulos de Euler permiten describir cualquier rotación en 3D.  
- Pero en ciertas configuraciones (cuando $$\cos\theta = 0$$), se pierde un grado de libertad: *gimbal lock*.  
- El problema tuvo consecuencias reales en sistemas de navegación como el del Apolo 11.  
- Una solución común en robótica moderna es emplear **cuaterniones**, libres de este problema.

