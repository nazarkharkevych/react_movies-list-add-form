import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (newValue: string) => void,
  onValidateUrl?: (url: string) => boolean,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  onChange = () => {},
  onValidateUrl = () => true,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setToched] = useState(false);
  const [isValidUrl, setIsValidUrl] = useState(true);
  const hasError = touched && required && !value.trim();
  const notValidUrl = touched && value.trim() && !isValidUrl;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);

    const isValid = onValidateUrl(e.target.value);

    setIsValidUrl(isValid);
  };

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          id={id}
          data-cy={`movie-${name}`}
          className={classNames('input', {
            'is-danger': hasError || notValidUrl,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={handleChange}
          onBlur={() => setToched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}

      {notValidUrl && (
        <p className="help is-danger">{`${label} is not valid`}</p>
      )}
    </div>
  );
};
