import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Signup from '../components/Signup';
import PersonalDetails from '../components/PersonalDetails';
import Others from '../components/Others';
import {
  emailPattern,
  passwordPattern,
  firstNameCheck,
  lastNameCheck,
  mobileNumberFormat,
} from '../patterns';

import styles from './Home.module.css';

const initialFormState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  address: '',
  countryCode: '',
  phoneNumber: '',
};
const initialFormErros = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  address: '',
  countryCode: '',
  phoneNumber: '',
};
const Home = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState(initialFormErros);
  const [terms, setTerms] = useState(false);
  let isFormError = false;

  const PageTitle = ['Signup', 'Personal Info', 'Other Info'];

  const getForms = () =>
    page === 0 ? (
      <Signup formData={formData} setFormData={setFormData} formErrors={formErrors} />
    ) : page === 1 ? (
      <PersonalDetails formData={formData} setFormData={setFormData} formErrors={formErrors} />
    ) : (
      <Others
        terms={terms}
        setTerms={setTerms}
        formData={formData}
        setFormData={setFormData}
        formErrors={formErrors}
      />
    );

  const handleSave = () => {
    if (page === 0) {
      if (!formData.email) {
        setFormErrors(prevErrors => ({ ...prevErrors, email: 'Email is required' }));
        isFormError = true;
      } else if (!String(formData.email).toLocaleLowerCase().match(emailPattern)) {
        isFormError = true;
        setFormErrors(prevErrors => ({ ...prevErrors, email: 'Email is not valid' }));
      } else {
        setFormErrors(prevErrors => ({ ...prevErrors, email: '' }));
      }

      if (!formData.password) {
        isFormError = true;
        setFormErrors(prevErrors => ({ ...prevErrors, password: 'Password is required' }));
      } else if (!String(formData.password).match(passwordPattern)) {
        isFormError = true;
        setFormErrors(prevErrors => ({ ...prevErrors, password: 'Password is not valid' }));
      } else {
        setFormErrors(prevErrors => ({ ...prevErrors, password: '' }));
      }
    }

    if (page === 1) {
      if (!formData.firstName) {
        setFormErrors(prevErrors => ({ ...prevErrors, firstName: 'First name is required' }));
        isFormError = true;
      } else if (!String(formData.firstName).match(firstNameCheck)) {
        isFormError = true;
        setFormErrors(prevErrors => ({ ...prevErrors, firstName: 'First Name is not valid' }));
      } else {
        setFormErrors(prevErrors => ({ ...prevErrors, firstName: '' }));
      }

      if (!String(formData.lastName).match(lastNameCheck)) {
        isFormError = true;
        setFormErrors(prevErrors => ({ ...prevErrors, lastName: 'Last Name is not valid' }));
      } else {
        setFormErrors(prevErrors => ({ ...prevErrors, lastName: '' }));
      }

      if (!formData.address) {
        isFormError = true;
        setFormErrors(prevErrors => ({ ...prevErrors, address: 'Address is required' }));
      } else if (formData.address.length < 10) {
        isFormError = true;
        setFormErrors(prevErrors => ({ ...prevErrors, address: 'Address is not valid' }));
      } else {
        setFormErrors(prevErrors => ({ ...prevErrors, address: '' }));
      }
    }

    if (page === 2) {
      if (!formData.countryCode) {
        isFormError = true;
        setFormErrors(prevErrors => ({ ...prevErrors, countryCode: 'Country Code is required' }));
      } else {
        setFormErrors(prevErrors => ({ ...prevErrors, countryCode: '' }));
      }

      if (!formData.phoneNumber) {
        isFormError = true;
        setFormErrors(prevErrors => ({ ...prevErrors, phoneNumber: 'Phone Number is required' }));
      } else if (!String(formData.phoneNumber).match(mobileNumberFormat)) {
        isFormError = true;
        setFormErrors(prevErrors => ({ ...prevErrors, phoneNumber: 'Phone Number is not valid' }));
      } else {
        setFormErrors(prevErrors => ({ ...prevErrors, phoneNumber: '' }));
      }

      if (!terms) {
        isFormError = true;
        setFormErrors(prevErrors => ({
          ...prevErrors,
          terms: 'Please accept terms and conditions',
        }));
      } else {
        setFormErrors(prevErrors => ({ ...prevErrors, terms: '' }));
      }
    }
  };

  useEffect(() => {
    if (
      !formErrors.email &&
      !formErrors.password &&
      !formErrors.firstName &&
      !formErrors.lastName &&
      !formErrors.address &&
      !formErrors.countryCode &&
      !formData.mobileNumberFormat &&
      terms
    ) {
      isFormError = false;
    }
  }, [
    formErrors.email,
    formErrors.password,
    formErrors.firstName,
    formErrors.lastName,
    formErrors.address,
    formErrors.countryCode,
    formErrors.mobileNumberFormat,
    terms,
  ]);

  const handleSaveAndNext = e => {
    handleSave();

    if (isFormError) {
      return;
    }

    if (page === 2) {
      const postRequest = async () => {
        const data = await fetch('https://codebuddy.review/submit', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
        const res = await data.json();
        console.log(res);
        navigate('/posts');
      };

      postRequest();
      return;
    }

    if (e.target.textContent === 'Save') return;
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h3>{PageTitle[page]}</h3>
        <div className={styles.forms}>{getForms()}</div>
        <div className={styles['btn-container']}>
          <button
            disabled={page === 0}
            onClick={() => {
              if (page === 0) return;
              setPage(prevPage => prevPage - 1);
            }}
            type="button"
            className={styles.back}
          >
            Back
          </button>
          <button onClick={e => handleSaveAndNext(e)} type="button" className={styles.save}>
            Save
          </button>
          <button
            disabled={page === 2}
            onClick={e => handleSaveAndNext(e)}
            type="button"
            className={styles.next}
          >
            Save and Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
