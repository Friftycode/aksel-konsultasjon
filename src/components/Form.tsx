import { useState } from 'react';
import '@navikt/ds-css';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  Textarea,
  TextField,
  useDatepicker,
} from '@navikt/ds-react';
import styles from './Form.module.less';

const Form = () => {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topics: [] as string[],
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    topics: '',
    message: '',
  });

  const today = new Date();
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() + 1);

  const toDate = new Date();
  toDate.setDate(today.getDate() + 60);

  const { datepickerProps, inputProps, selectedDay } = useDatepicker({
    fromDate: fromDate,
    toDate: toDate,
    locale: 'nb',
    disableWeekends: true,
  });

  const handleTopicsChange = (val: string[]) => {
    setFormData((prev) => ({ ...prev, topics: val }));
  };

  const isValidName = (name: string) => {
    const nameRegex = /^[A-Za-zæøåÆØÅ -]+$/;
    return nameRegex.test(name) && name.trim().length >= 3;
  };

  const validate = () => {
    const newErrors = {
      name: formData.name
        ? isValidName(formData.name)
          ? ''
          : 'Navnet må være minst 3 bokstaver og kun inneholde bokstaver og mellomrom'
        : 'Navn er påkrevd',
      email:
        formData.email.includes('@') && formData.email.includes('.')
          ? ''
          : 'Ugyldig e-postadresse',
      phone: formData.phone.match(/^(\+|00)?[\d\s-]{7,20}$/)
        ? ''
        : 'Telefonnummeret er ugyldig',
      date: selectedDay ? '' : 'Du må velge en dato',
      topics: formData.topics.length > 0 ? '' : 'Velg minst ett tema',
      message:
        formData.message.length >= 10 ? '' : 'Meldingen må være minst 10 tegn',
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit} noValidate>
      <TextField
        label="Fullt navn"
        value={formData.name}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, name: e.target.value }))
        }
        error={errors.name}
        pattern="[A-Za-zæøåÆØÅ \-]+"
      />
      <TextField
        label="E-postadresse"
        value={formData.email}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, email: e.target.value }))
        }
        error={errors.email}
      />
      <TextField
        label="Telefonnummer"
        type="tel"
        inputMode="numeric"
        value={formData.phone}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, phone: e.target.value }))
        }
        error={errors.phone}
      />
      <DatePicker {...datepickerProps} dropdownCaption showWeekNumber={true}>
        <DatePicker.Input
          label="Når ønsker du å ha samtalen?"
          error={errors.date}
          {...inputProps}
        />
      </DatePicker>
      <CheckboxGroup
        legend="Hva ønsker du hjelp med?"
        onChange={handleTopicsChange}
        error={errors.topics}
      >
        <Checkbox value="job">Jobbsøking og karriere</Checkbox>
        <Checkbox value="education">Utdanning og kurs</Checkbox>
        <Checkbox value="other">Andre temaer</Checkbox>
      </CheckboxGroup>
      <Textarea
        label="Hva ønsker du å snakke om?"
        value={formData.message}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, message: e.target.value }))
        }
        error={errors.message}
      />
      <Button className={styles.button} type="submit">
        Bestill
      </Button>
      {submitted && (
        <p className={styles.confirmationText}>Takk for din bestilling!</p>
      )}
    </form>
  );
};

export default Form;
