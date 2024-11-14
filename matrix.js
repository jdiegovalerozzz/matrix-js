class Matrix {
    constructor(matrix) {
      this.matrix = matrix;
    }
  
    // Suma de matrices
    add(otherMatrix) {
      if (this.matrix.length !== otherMatrix.matrix.length || 
          this.matrix[0].length !== otherMatrix.matrix[0].length) {
        return 'Las matrices deben tener el mismo tamaño';
      }
      const result = this.matrix.map((row, i) =>
        row.map((val, j) => val + otherMatrix.matrix[i][j])
      );
      return new Matrix(result);
    }
  
    // Resta de matrices
    subtract(otherMatrix) {
      if (this.matrix.length !== otherMatrix.matrix.length || 
          this.matrix[0].length !== otherMatrix.matrix[0].length) {
        return 'Las matrices deben tener el mismo tamaño';
      }
      const result = this.matrix.map((row, i) =>
        row.map((val, j) => val - otherMatrix.matrix[i][j])
      );
      return new Matrix(result);
    }
  
    // Multiplicación de matrices
    multiply(otherMatrix) {
      const rowsA = this.matrix.length;
      const colsA = this.matrix[0].length;
      const rowsB = otherMatrix.matrix.length;
      const colsB = otherMatrix.matrix[0].length;
  
      if (colsA !== rowsB) {
        return 'El número de columnas de la primera matriz debe ser igual al número de filas de la segunda';
      }
  
      const result = Array(rowsA).fill().map(() => Array(colsB).fill(0));
  
      for (let i = 0; i < rowsA; i++) {
        for (let j = 0; j < colsB; j++) {
          for (let k = 0; k < colsA; k++) {
            result[i][j] += this.matrix[i][k] * otherMatrix.matrix[k][j];
          }
        }
      }
  
      return new Matrix(result);
    }
  
    // Transposición de la matriz
    transpose() {
      const result = this.matrix[0].map((_, colIndex) => 
        this.matrix.map(row => row[colIndex])
      );
      return new Matrix(result);
    }
  
    // Inversa de la matriz (solo para matrices cuadradas)
    inverse() {
      const rows = this.matrix.length;
      const cols = this.matrix[0].length;
  
      if (rows !== cols) {
        return 'Solo las matrices cuadradas tienen inversa';
      }
  
      const augmentedMatrix = this._augmentIdentityMatrix();
      const n = rows;
  
      for (let i = 0; i < n; i++) {
        let pivot = augmentedMatrix[i][i];
        if (pivot === 0) {
          return 'La matriz no tiene inversa (determinante 0)';
        }
        for (let j = 0; j < 2 * n; j++) {
          augmentedMatrix[i][j] /= pivot;
        }
  
        for (let j = 0; j < n; j++) {
          if (i !== j) {
            let factor = augmentedMatrix[j][i];
            for (let k = 0; k < 2 * n; k++) {
              augmentedMatrix[j][k] -= factor * augmentedMatrix[i][k];
            }
          }
        }
      }
  
      const inverseMatrix = augmentedMatrix.map(row => row.slice(n));  
      return new Matrix(inverseMatrix);
    }
  
    // Método auxiliar para obtener la matriz aumentada [A | I]
    _augmentIdentityMatrix() {
      const n = this.matrix.length;
      const augmented = this.matrix.map(row => row.slice());
  
      for (let i = 0; i < n; i++) {
        augmented[i] = augmented[i].concat(Array(n).fill(0));
        augmented[i][n + i] = 1;
      }
  
      return augmented;
    }
  
    // Método para obtener la matriz identidad de tamaño `n`
    static identity(n) {
      const result = Array(n).fill().map((_, i) =>
        Array(n).fill().map((_, j) => (i === j ? 1 : 0))
      );
      return new Matrix(result);
    }
  
    // Producto escalar de la matriz por un número
    scalarProduct(scalar) {
      const result = this.matrix.map(row => 
        row.map(val => val * scalar)
      );
      return new Matrix(result);
    }
  
    // Método para convertir la matriz a un string para su visualización
    toString() {
      return this.matrix.map(row => row.join(' ')).join('\n');
    }
  }
  
  // Función para realizar la suma de matrices
  function performAddition() {
    const matrixA = getMatrixFromInputs('matrixA');
    const matrixB = getMatrixFromInputs('matrixB');
    const result = matrixA.add(matrixB);
    displayResult('Suma', result);
  }
  
  // Función para realizar la resta de matrices
  function performSubtraction() {
    const matrixA = getMatrixFromInputs('matrixA');
    const matrixB = getMatrixFromInputs('matrixB');
    const result = matrixA.subtract(matrixB);
    displayResult('Resta', result);
  }
  
  // Función para realizar la multiplicación de matrices
  function performMultiplication() {
    const matrixA = getMatrixFromInputs('matrixA');
    const matrixB = getMatrixFromInputs('matrixB');
    const result = matrixA.multiply(matrixB);
    displayResult('Multiplicación', result);
  }
  
  // Función para realizar la transposición de la matriz A
  function performTranspose() {
    const matrixA = getMatrixFromInputs('matrixA');
    const result = matrixA.transpose();
    displayResult('Transpuesta de A', result);
  }
  
  // Función para realizar la inversa de la matriz A
  function performInverse() {
    const matrixA = getMatrixFromInputs('matrixA');
    const result = matrixA.inverse();
    displayResult('Inversa de A', result);
  }
  
  // Función para realizar la matriz identidad de tamaño n
  function performIdentity() {
    const rowsA = document.querySelectorAll('#matrixA .matrix-row').length;
    const identityMatrix = Matrix.identity(rowsA);
    displayIdentityMatrix(identityMatrix);
  }
  
  // Función para realizar el producto escalar de la matriz A
  function performScalarProduct() {
    const scalar = parseFloat(prompt("Introduce el valor del producto escalar:"));
    const matrixA = getMatrixFromInputs('matrixA');
    const result = matrixA.scalarProduct(scalar);
    displayResult('Producto escalar', result);
  }
  
  // Función para obtener la matriz desde los inputs HTML
  function getMatrixFromInputs(matrixId) {
    const matrixDiv = document.getElementById(matrixId);
    const rows = Array.from(matrixDiv.getElementsByClassName('matrix-row'));
    const matrix = rows.map(row => 
      Array.from(row.getElementsByTagName('input')).map(input => parseFloat(input.value))
    );
    return new Matrix(matrix);
  }
  
  // Función para mostrar el resultado en el HTML
  function displayResult(operation, result) {
    const outputElement = document.getElementById('operationResult');
    outputElement.innerHTML = `<strong>${operation}:</strong><pre>${result.toString()}</pre>`;
  }
  
  // Función para mostrar la matriz identidad en el HTML
  function displayIdentityMatrix(matrix) {
    const identityContainer = document.getElementById('identityMatrix').querySelector('.matrix');
    identityContainer.innerHTML = '';  // Limpiar la matriz actual
  
    matrix.matrix.forEach(row => {
      const rowDiv = document.createElement('div');
      rowDiv.classList.add('matrix-row');
      row.forEach(cell => {
        const input = document.createElement('input');
        input.type = 'number';
        input.value = cell;
        input.disabled = true;  // Hacemos que los inputs sean solo de lectura
        rowDiv.appendChild(input);
      });
      identityContainer.appendChild(rowDiv);
    });
  }
  
  // Función para agregar una fila
  function addRow(matrixId) {
    const matrixDiv = document.getElementById(matrixId);
    const row = document.createElement('div');
    row.classList.add('matrix-row');
    const cols = matrixDiv.children[0] ? matrixDiv.children[0].children.length : 1;
    for (let i = 0; i < cols; i++) {
      const input = document.createElement('input');
      input.type = 'number';
      input.value = 0;  // Valor predeterminado de cada input
      row.appendChild(input);
    }
    matrixDiv.appendChild(row);
  }
  
  // Función para eliminar una fila
  function removeRow(matrixId) {
    const matrixDiv = document.getElementById(matrixId);
    if (matrixDiv.children.length > 1) {
      matrixDiv.removeChild(matrixDiv.lastElementChild);
    }
  }
  
  // Función para agregar una columna
  function addColumn(matrixId) {
    const matrixDiv = document.getElementById(matrixId);
    const rows = matrixDiv.getElementsByClassName('matrix-row');
    Array.from(rows).forEach(row => {
      const input = document.createElement('input');
      input.type = 'number';
      input.value = 0;  // Valor predeterminado de cada input
      row.appendChild(input);
    });
  }
  
  // Función para eliminar una columna
  function removeColumn(matrixId) {
    const matrixDiv = document.getElementById(matrixId);
    const rows = matrixDiv.getElementsByClassName('matrix-row');
    Array.from(rows).forEach(row => {
      if (row.children.length > 1) {
        row.removeChild(row.lastElementChild);
      }
    });
  }
  