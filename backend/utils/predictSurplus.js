const { spawn } = require('child_process');

const predictSurplus = (productInput) => {
  return new Promise((resolve, reject) => {
    const py = spawn('python', ['ai/surplus_predictor.py']);
    let data = '';

    py.stdout.on('data', (chunk) => {
      data += chunk.toString();
    });

    py.stderr.on('data', (err) => {
      reject(err.toString());
    });

    py.stdin.write(JSON.stringify(productInput));
    py.stdin.end();

    py.on('close', () => {
      try {
        const prediction = JSON.parse(data);
        resolve(prediction);
      } catch (err) {
        reject('Error parsing prediction output: ' + err.message);
      }
    });
  });
};

module.exports = predictSurplus;
