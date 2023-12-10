export default function Register(){
    return(
        <div class="login-container">
        <div class="login-form">
            <div class="avatar">
                <img src="images/hero.png" alt="Login Image" class="login-image" />
            </div>
            <h2>SIGN UP</h2>
            <form>
                <div class="input-group">
                    <input type="email" id="email" name="email" placeholder="📧 Email Address" required/>
                </div>
                <div class="input-group">
                    <input type="text" id="username" name="username" placeholder="Username" required/>
                </div>
                <div class="input-group">
                    <input type="password" id="password" name="password" placeholder="🔑 Password" required/>
                    <input type="password" id="password" name="password" placeholder="🔑 Confrirm Password" required/>
                </div>
                <div class="input-group">
                    <button type="submit">LOGIN</button>
                </div>
            </form>
            <div class="sign-up-text">
                Already have an account? <a href="/">Sign In</a>
            </div>
        </div>
    </div>
    );
}


