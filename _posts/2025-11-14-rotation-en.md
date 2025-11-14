---
title: 'Robotics. Rotation Spaces'
date: 2025-11-13
permalink: /posts/2025/11/t0rotation/
tags:
  - robotics
  - kinematics
  - math
---

# Topic 0: Introduction to Rotation Spaces

## 0.1 Symmetry Set in 3 Dimensions (O(3))

The set $$O(3) = \{R \in \mathbb{R}^{3 \times 3}\}$$ is defined as the set of operations that satisfy:

$$R R^T = I, \quad \forall R \in O(3)$$

where $$I$$ is the $$3\times3$$ identity matrix.

---

**Property 1: Determinant**

$$
\det(R) = \pm 1 \quad
\forall R \in O(3)
$$

**Proof:**

$$
\det(R R^T) = \det(I) = 1
$$

$$
\det(R R^T) = \det(R)\,\det(R^T) = \det(R)^2 = 1
$$

$$
\det(R) = \pm 1
$$

The determinant cannot be a complex number because \(R\) is defined over $$\mathbb{R}^{3\times3}$$.

---

**Property 2: Norm Preservation**

$$
\left\| R u \right\| = \left\| u\right\| \quad \forall u \in \mathbb{R}^3
$$

**Proof:**

$$
\left\| R u \right\|^2 = (R u)^T (R u) = u^T R^T R u = u^T I u = u^T u = \left\| u \right\|^2
$$

$$
\left\| R u \right\| = \left\| u \right\|
$$

---

**Property 3: Angle Preservation**

$$
\widehat{u v} = \widehat{u' v'} \quad \forall u, v \in \mathbb{R}^3
$$

$$
u' = R u
$$

$$
v' = R v
$$

**Proof:**

$$
\cos \theta' = \frac{u'v'}{\left\| u'\right\|\left\| v'\right\|} =
\frac{u R^T R v}{\left\| R u\right\|\left\| R v\right\|} =
\frac{u v}{\left\| u\right\|\left\| v\right\|} = \cos \theta
$$

---

## 0.2 Subsets of O(3)

The set $$O(3)$$ can be divided into two subsets depending on the value of the determinant of its transformations:

1. **Transformations with $$\det(R) = 1$$**
2. **Transformations with $$\det(R) = -1$$**

---

### Transformations with $$\det(R) = -1$$

These operations satisfy all properties of $$O(3)$$, **but they do not preserve orientation**.

**Example:**

$$
\begin{pmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & -1 \\
\end{pmatrix}
\begin{pmatrix}
x \\
y \\
z
\end{pmatrix}
=
\begin{pmatrix}
x \\
y \\
-z
\end{pmatrix}
$$

This transformation flips the $$z$$ dimension, changing the orientation of the coordinate system.  
For this reason, they cannot be used in robotics.

---

## 0.3 Subset SO(3)

It is defined as the subset of $$O(3)$$ whose matrices have determinant $$+1$$:

$$
SO(3) = \{ R \in O(3) \mid \det(R) = 1 \}
$$

This subset is the most relevant for **rotations in robotics**, as it represents all pure rotations in $$\mathbb{R}^3$$ without reflecting the coordinate system.

---

### Diagonalization

Formal diagonalization implies that there exist eigenvectors $$u \in \mathbb{R}^3$$ and eigenvalues $$\lambda$$ such that:

$$
R u = \lambda u
$$

The eigenvalues satisfy:

$$
\det(R) = \lambda_1 \lambda_2 \lambda_3 = 1
$$

Furthermore, since $$R$$ preserves the norm of any vector:

$$
\left\| R u \right\| = \left\| u\right\|
$$

$$
\det R\, \left\| u\right\| = |\lambda|\,\left\| u\right\|
$$

Which implies:

$$
|\lambda| = 1
$$

Thus, **all eigenvalues of any $$R \in SO(3)$$ have magnitude 1**.

---

### Properties of Eigenvalues of $$R \in SO(3)$$

If $$\lambda \in \mathbb{C}$$ is an eigenvalue with eigenvector $$u$$:

$$
R u = \lambda u
$$

Since $$R$$ is real:

$$
(R u)^* = (\lambda u)^* \implies R (u^*) = \lambda^* u^*
$$

If one eigenvalue is complex, its conjugate is also an eigenvalue:

$$
|\lambda| = 1 \implies \lambda_1 = e^{i\theta}, \quad \lambda_2 = e^{-i\theta}
$$

Since $$\det(R) = 1$$:

$$
\det(R) = \lambda_1 \lambda_2 \lambda_3 = 1 \implies \lambda_3 = 1
$$

**Conclusion:**

Every matrix in $$SO(3)$$ has **one eigenvalue equal to 1**, and the other two form a conjugate pair $$e^{\pm i \theta}$$, representing rotation about an axis.

---

### Degrees of Freedom of SO(3)

Operators $$R \in SO(3)$$ are defined by the set of eigenvalues:

$$
\lambda = \{ e^{i\theta}, e^{-i\theta}, 1 \}, \quad \theta \in [0, 2\pi)
$$

**SO(3) has 3 degrees of freedom:**

1. Rotation angle $$\theta$$ (1 DOF)
2. The normal vector defining the rotation axis (2 DOF)

---

## 0.4 Euler Angles

As demonstrated, the subset of rotations in $$\mathbb{R}^3$$ has 3 degrees of freedom.  
**Euler angles** parameterize rotations in $$\mathbb{R}^3$$ using three independent angles.  
They allow expressing any $$R \in SO(3)$$ as the product of three elementary rotations.

### Z–Y–Z Convention

The choice of rotation axes is arbitrary; one of the most common is the Z–Y–Z convention:

$$
R = R_z(\phi) \cdot R_y(\theta) \cdot R_z(\psi)
$$

where:

* $$R_z(\phi)$$: rotation around the $$z$$-axis by angle $$\phi$$  
* $$R_y(\theta)$$: rotation around the $$y$$-axis by angle $$\theta$$  
* $$R_z(\psi)$$: rotation around the $$z$$-axis by angle $$\psi$$

---

### Properties

1. **Complete representation:** any $$R \in SO(3)$$ can be written as a combination of three elementary rotations.  
2. **Degrees of freedom:** the three Euler angles $$(\phi, \theta, \psi)$$ represent the **three degrees of freedom** of $$SO(3)$$.  
3. **Composition of rotations:** multiplying matrices corresponds to sequentially applying rotations.  
4. 

## 0.5 The Euler Angle Problem: *Gimbal Lock*

Euler angles are a very useful tool for describing rotations in $$\mathbb{R}^3$$.  
They allow parameterizing any matrix $$R \in SO(3)$$ using three angles.  
However, **they are not a perfect representation** and have important limitations.

The best-known issue is the phenomenon called **gimbal lock**.

---

### What Is *Gimbal Lock*?

*Gimbal lock* occurs when, due to the combination of two rotations, **two rotation planes become parallel**, causing one of the three degrees of freedom to be lost.

For the Euler parameterizations **Z–Y–Z** or **Z–Y–X**, this problem appears when:

$$
\cos\theta = 0
$$

which is equivalent to:

$$
\theta = \frac{\pi}{2} \quad \text{or} \quad \theta = -\frac{\pi}{2}
$$

---

### Demonstration Using the Jacobian

Let $$R(\phi, \theta, \psi)$$ be the rotation matrix in Euler angles.  
The Jacobian with respect to the three parameters is:

$$
J =
\begin{pmatrix}
\frac{\partial R}{\partial \phi} &
\frac{\partial R}{\partial \theta} &
\frac{\partial R}{\partial \psi}
\end{pmatrix}
$$

The determinant of the Jacobian represents the **ability of the three angles to generate independent orientation variations**.

In common parameterizations:

$$
\det(J) = \cos\theta
$$

Therefore:

$$
\cos\theta = 0 \quad \Rightarrow \quad \det(J) = 0
$$

When the determinant is zero, the Jacobian **loses rank**, meaning that **variations in the three angles no longer produce three independent degrees of freedom**.

At that point, the system goes from having 3 degrees of freedom to having only 2.

---

### Geometric Intuition

When $$\theta = \pm \frac{\pi}{2}$$, the rotations around the external and internal axes (e.g., $$\phi$$ and $$\psi$$) align and produce equivalent rotations.  
In other words:

- Rotating using $$\phi$$ produces exactly the same rotation as rotating using $$\psi$$.  
- The system loses one independent axis.

The physical equivalent mechanism is **three gimbal rings**, where two of them become aligned, eliminating one degree of freedom.

![Gimbal](https://upload.wikimedia.org/wikipedia/commons/5/5a/Gimbal_3_axes_rotation.gif)

---

### *Gimbal Lock* in the Apollo 11 Mission

The *gimbal lock* phenomenon had real-world consequences in navigation systems for decades, especially in space missions.

In **Apollo 11**, the inertial navigation platform used a system of **three gimbals** to maintain the spacecraft’s orientation.  
Engineers knew that if the spacecraft reached an orientation close to *gimbal lock*, the system would lose one degree of freedom and become practically “blind” to certain rotations.

During the mission, as they descended toward the Moon, Neil Armstrong and Buzz Aldrin were warned **multiple times** to avoid maneuvers leading the platform into the critical region where:

$$
\theta \approx \pm 90^\circ
$$

Had the system entered *gimbal lock* during descent, it would have been necessary to **reinitialize the entire inertial platform**, a slow and risky process that would have forced aborting the landing.

After the Lunar Module had landed, Mike Collins aboard the Command Module joked:  
**“How about sending me a fourth gimbal for Christmas?”**

### In Robotics

Gimbal lock also affects robotics, and is known as *wrist flip* or *robot singularities*, which refer to configurations where robotic arms lose predictability.

---

### Conclusion

- Euler angles allow describing any rotation in 3D.  
- But in certain configurations (when $$\cos\theta = 0$$), one degree of freedom is lost: *gimbal lock*.  
- The problem had real consequences in navigation systems such as Apollo 11’s.  
- A common solution in modern robotics is using **quaternions**, which do not suffer from this issue.
