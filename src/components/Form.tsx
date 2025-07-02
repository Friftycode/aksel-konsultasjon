import { useState } from 'react';
import '@navikt/ds-css';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  Textarea,
  TextField,
} from '@navikt/ds-react';
import styles from './Form.module.less';

const Form = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
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
  const fromDate = new Date(today);
  fromDate.setDate(today.getDate() + 1);
  const toDate = new Date(today);
  toDate.setDate(today.getDate() + 90);

  const handleChange = (val: string[]) => {
    setFormData((prev) => ({ ...prev, topics: val }));
  };

  const isValidName = (name: string) => {
    const allowed =
      'abcdefghijklmnopqrstuvwxyzæøåABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ -';
    for (let i = 0; i < name.length; i++) {
      if (!allowed.includes(name[i])) {
        return false;
      }
    }
    return true;
  };

  const validate = () => {
    const newErrors = {
      name: formData.name
        ? isValidName(formData.name)
          ? ''
          : 'Navnet kan kun inneholde bokstaver og mellomrom'
        : 'Navn er påkrevd',
      email:
        formData.email.includes('@') && formData.email.includes('.')
          ? ''
          : 'Ugyldig e-postadresse',
      phone:
        formData.phone.length === 8 && /^\d+$/.test(formData.phone)
          ? ''
          : 'Telefon må være 8 sifre',
      date: date ? '' : 'Du må velge en dato',
      topics: formData.topics.length > 0 ? '' : 'Velg minst ett tema',
      message:
        formData.message.length >= 10 ? '' : 'Meldingen må være minst 10 tegn',
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <form className={styles.formnContainer} onSubmit={handleSubmit}>
      <TextField
        label="Fullt navn"
        value={formData.name}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, name: e.target.value }))
        }
        error={errors.name}
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
        value={formData.phone}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, phone: e.target.value }))
        }
        error={errors.phone}
      />
      <DatePicker
        selected={date}
        onSelect={setDate}
        fromDate={fromDate}
        toDate={toDate}
        dropdownCaption
        disableWeekends
        showWeekNumber={true}
      >
        <DatePicker.Input
          label="Når ønsker du å ha samtalen?"
          value={date ? date.toLocaleDateString('nb-NO') : ''}
          onChange={() => {}}
          error={errors.date}
        />
      </DatePicker>
      <CheckboxGroup
        legend="Hva ønsker du hjelp med?"
        onChange={handleChange}
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
        <div className={styles.confirmationText}>Takk for din bestilling!</div>
      )}
    </form>
  );
};

export default Form;
