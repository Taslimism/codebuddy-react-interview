import styles from './Others.module.css';

const Others = ({ formData, setFormData, formErrors, terms, setTerms }) => (
  <div className={styles['form-container']}>
    <div>
      <span>Country Code</span>
      <select
        onChange={e => setFormData(() => ({ ...formData, countryCode: e.target.value }))}
        value={formData.countryCode}
      >
        <option value="">Choose</option>
        <option value="+91">India (+91)</option>
        <option value="+1">USA (+1)</option>
      </select>
      <p>{formErrors.countryCode}</p>
    </div>
    <input
      placeholder="Phonenumber (10 digits)"
      onChange={e => setFormData(() => ({ ...formData, phoneNumber: e.target.value }))}
      value={formData.phoneNumber}
      type="text"
    />
    <p>{formErrors.phoneNumber}</p>
    <input type="checkbox" checked={terms} onChange={() => setTerms(!terms)} />
    <span>Terms and Conditions</span>
    <p>{formErrors.terms}</p>
  </div>
);

export default Others;
