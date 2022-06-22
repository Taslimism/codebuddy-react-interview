import styles from './Signup.module.css';

const Signup = ({ formData, setFormData, formErrors }) => (
  <div className={styles['form-container']}>
    <input
      type="email"
      placeholder="code@buddy.com"
      value={formData.email}
      onChange={e => setFormData(() => ({ ...formData, email: e.target.value }))}
    />
    <p style={{ color: 'red' }}>{formErrors.email}</p>
    <input
      placeholder="Password"
      type="password"
      value={formData.password}
      onChange={e => setFormData(() => ({ ...formData, password: e.target.value }))}
    />
    <p style={{ color: 'red' }}>{formErrors.password}</p>
  </div>
);

export default Signup;
