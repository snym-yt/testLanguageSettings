const express = require('express');
const fs = require('fs');
const app = express();

// ==============================================================================
// ============================== run Go file ===================================
// ==============================================================================

console.log("start running Go file")
const { execSync } = require('child_process')
try {
    const stdout = execSync('go run write.go');
    console.log(`stdout: ${stdout.toString()}`);
} catch (err) {
    console.error('Error executing command:', err);
}

// ==============================================================================
// ============================= read txt file ==================================
// ==============================================================================

app.get('/docs', (req, res) => {
    // melody.txtの内容を読み込んでクライアントに返す
    fs.readFile('./docs', 'utf8', (err, data) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(data);
    });
});

app.use(express.static('./docs'));

// ==============================================================================
// ============================= serve static files =============================
// ==============================================================================

app.use(express.static('.')); // '.'は現在のディレクトリを指します

// ==============================================================================
// ================================== listen ====================================
// ==============================================================================

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
