const form = document.getElementById('login-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let errors = [];

    if (username.length < 3) {
        errors.push('Username must be at least 3 characters long');
        document.getElementById('username-error').innerHTML = 'Username must be at least 3 characters long';
    }

    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
        document.getElementById('password-error').innerHTML = 'Password must be at least 8 characters long';
    }

    if (errors.length > 0) {
        console.log(errors);
        return;
    }

    // Hash the password using bcrypt
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Check if the username and password match a user in the database
    // For demonstration purposes, we'll use a fake database
    const users = [
        { username: 'john', password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' },
        { username: 'jane', password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' }
    ];

    const user = users.find((user) => user.username === username && bcrypt.compareSync(password, user.password));

    if (user) {
        // Login successful, redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        // Login failed, display error message
        document.getElementById('password-error').innerHTML = 'Invalid username or password';
    }
});