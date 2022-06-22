import styles from './PersonalDetails.module.css';

const PersonalDetails = ({ formData, setFormData, formErrors }) => (
  <div className={styles['form-container']}>
    <input
      type="text"
      placeholder="Firstname"
      onChange={e => setFormData({ ...formData, firstName: e.target.value })}
      value={formData.firstName}
    />
    <p>{formErrors.firstName}</p>
    <input
      type="text"
      placeholder="Lastname"
      onChange={e => setFormData({ ...formData, lastName: e.target.value })}
      value={formData.lastName}
    />
    <p>{formErrors.lastName}</p>
    <input
      type="text"
      placeholder="Adresss"
      onChange={e => setFormData({ ...formData, address: e.target.value })}
      value={formData.address}
    />
    <p>{formErrors.address}</p>
  </div>
);

export default PersonalDetails;
