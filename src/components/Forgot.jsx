
import '../css/forgot.css'
import 'react-toastify/dist/ReactToastify.css';

const Forgot = () => {
  return (
    <>
    <div className="form-container">
        <div className='form'>
            <h1 className="sign-heading">
                Forgot Password
            </h1>
            {/* {!isSubmitted ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-row">
                        <div className="custom-input">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                {...register('email', { required: "Email is required" })}
                            />
                            {errors.email && <span className="error-message">Email is required</span>}
                        </div>
                    </div>
                    <div className="login-btn">
                        <input type="submit" value="Send Reset Link" />
                    </div>
                </form>
            ) : (
                <p>A password reset link has been sent to your email.</p>
            )} */}
        </div>
    </div>
    </>)
}

export default Forgot