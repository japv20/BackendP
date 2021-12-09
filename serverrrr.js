const express = require('express');

const app = express();

app.get('188.166.172.132', (req, res) => {
    res.send('Successful response.');
});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));
