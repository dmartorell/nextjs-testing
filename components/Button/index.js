import styles from '../../styles/Button.module.css'
const Button = ({children, ...props}) => {
    return (
        <>
            <button type="button" className={styles.loginButton} {...props}>
                {children}
            </button>
        </>
    )
}

export default Button
