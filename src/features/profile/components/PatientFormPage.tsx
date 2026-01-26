import React from 'react';
import { Input } from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import { Select } from '@/components/Select/Select';
import { FileUpload } from '@/components/FileUpload/FileUpload';
import { Checkbox } from '@/components/Checkbox/Checkbox';
import { usePatientForm } from '../hooks/usePatientForm';

export const PatientFormPage = () => {
  const { formData, errors, isLoading, handleChange, handleFileChange, handleSubmit } =
    usePatientForm();

  const genreOptions = [
    { value: 'Homme', label: 'Male' },
    { value: 'Femme', label: 'Female' },
    { value: 'Autre', label: 'Other' },
  ];

  const identificationTypes = [
    { value: 'Birth Certificate', label: 'Birth Certificate' },
    { value: 'Driver License', label: 'Driver License' },
    { value: 'Passport', label: 'Passport' },
    { value: 'National ID', label: 'National ID' },
  ];

  const docteurs = [
    { value: 'dr-smith', label: 'Dr. Adam Smith' },
    { value: 'dr-johnson', label: 'Dr. Sarah Johnson' },
    { value: 'dr-williams', label: 'Dr. Michael Williams' },
  ];

  return (
    <>
      {/* WRAPPER PLEIN ÉCRAN */}
      <div className="h-screen w-screen bg-dark">
        {/* CARD PLEIN ÉCRAN */}
        <div className="w-full h-full bg-dark-light border border-dark-lighter shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full">

            {/* ==================== PARTIE GAUCHE : FORMULAIRE ==================== */}
            <div className="p-8 lg:p-10 overflow-y-auto">

              {/* Logo */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">+</span>
                </div>
                <span className="text-white text-2xl font-bold">CarePulse</span>
              </div>

              <h1 className="text-white text-3xl font-bold mb-2">
                Welcome 👋
              </h1>
              <p className="text-gray-secondary mb-10">
                Let us know more about yourself
              </p>

              <form onSubmit={handleSubmit} className="space-y-10">

                {/* PERSONAL INFORMATION */}
                <section>
                  <h2 className="text-white text-xl font-bold mb-6">
                    Personal Information
                  </h2>

                  <div className="space-y-5">
                    <Input
                      label="Full name"
                      name="nomComplet"
                      type="text"
                      placeholder="ex. Adrian"
                      value={formData.nomComplet}
                      onChange={handleChange}
                      error={errors.nomComplet}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Input
                        label="Email address"
                        name="email"
                        type="email"
                        placeholder="adrian@jsmastery.pro"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                      />
                      <Input
                        label="Phone number"
                        name="telephone"
                        type="tel"
                        placeholder="+00 0342 0443 34"
                        value={formData.telephone}
                        onChange={handleChange}
                        error={errors.telephone}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Input
                        label="Date of birth"
                        name="dateNaissance"
                        type="date"
                        value={formData.dateNaissance}
                        onChange={handleChange}
                        error={errors.dateNaissance}
                      />
                      <Select
                        label="Gender"
                        name="genre"
                        options={genreOptions}
                        placeholder="Select gender"
                        value={formData.genre}
                        onChange={handleChange}
                        error={errors.genre}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Input
                        label="Address"
                        name="adresse"
                        type="text"
                        placeholder="ex. 14 street, New York"
                        value={formData.adresse}
                        onChange={handleChange}
                        error={errors.adresse}
                      />
                      <Input
                        label="Occupation"
                        name="profession"
                        type="text"
                        placeholder="Software Engineer"
                        value={formData.profession}
                        onChange={handleChange}
                        error={errors.profession}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Input
                        label="Emergency contact name"
                        name="nomContactUrgence"
                        type="text"
                        value={formData.nomContactUrgence}
                        onChange={handleChange}
                        error={errors.nomContactUrgence}
                      />
                      <Input
                        label="Phone number"
                        name="telephoneContactUrgence"
                        type="tel"
                        value={formData.telephoneContactUrgence}
                        onChange={handleChange}
                        error={errors.telephoneContactUrgence}
                      />
                    </div>
                  </div>
                </section>

                {/* MEDICAL INFORMATION */}
                <section>
                  <h2 className="text-white text-xl font-bold mb-6">
                    Medical Information
                  </h2>

                  <div className="space-y-5">
                    <Select
                      label="Primary care physician"
                      name="medecinTraitant"
                      options={docteurs}
                      placeholder="Select a doctor"
                      value={formData.medecinTraitant}
                      onChange={handleChange}
                      error={errors.medecinTraitant}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Input
                        label="Insurance provider"
                        name="fournisseurAssurance"
                        type="text"
                        value={formData.fournisseurAssurance}
                        onChange={handleChange}
                        error={errors.fournisseurAssurance}
                      />
                      <Input
                        label="Insurance policy number"
                        name="numeroPoliceAssurance"
                        type="text"
                        value={formData.numeroPoliceAssurance}
                        onChange={handleChange}
                        error={errors.numeroPoliceAssurance}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Input
                        label="Allergies"
                        name="allergies"
                        type="text"
                        value={formData.allergies}
                        onChange={handleChange}
                        error={errors.allergies}
                      />
                      <Input
                        label="Current medications"
                        name="medicamentsActuels"
                        type="text"
                        value={formData.medicamentsActuels}
                        onChange={handleChange}
                        error={errors.medicamentsActuels}
                      />
                    </div>
                  </div>
                </section>

                {/* IDENTIFICATION */}
                <section>
                  <h2 className="text-white text-xl font-bold mb-6">
                    Identification and Verification
                  </h2>

                  <div className="space-y-5">
                    <Select
                      label="Identification type"
                      name="typeIdentification"
                      options={identificationTypes}
                      value={formData.typeIdentification}
                      onChange={handleChange}
                      error={errors.typeIdentification}
                    />

                    <Input
                      label="Identification Number"
                      name="numeroIdentification"
                      type="text"
                      value={formData.numeroIdentification}
                      onChange={handleChange}
                      error={errors.numeroIdentification}
                    />

                    <FileUpload
                      label="Scanned Copy of Identification Document"
                      onChange={handleFileChange}
                      error={errors.documentIdentification}
                    />
                  </div>
                </section>

                {/* CONSENT */}
                <section>
                  <h2 className="text-white text-xl font-bold mb-6">
                    Consent and Privacy
                  </h2>

                  <div className="space-y-4">
                    <Checkbox
                      name="consentementTraitement"
                      checked={formData.consentementTraitement}
                      onChange={handleChange}
                      label="I consent to receive treatment for my health condition."
                    />
                    <Checkbox
                      name="consentementConfidentialite"
                      checked={formData.consentementConfidentialite}
                      onChange={handleChange}
                      label="I consent to the use of my health information."
                    />
                    <Checkbox
                      name="consentementDivulgation"
                      checked={formData.consentementDivulgation}
                      onChange={handleChange}
                      label="I agree to the privacy policy."
                    />
                  </div>
                </section>

                <Button type="submit" isLoading={isLoading}>
                  Submit and continue
                </Button>
              </form>
            </div>

            {/* ==================== PARTIE DROITE : IMAGE ==================== */}
            <div className="hidden lg:block relative bg-[#0D0F10]">
              <img
                src="https://images.pexels.com/photos/3279197/pexels-photo-3279197.jpeg"
                alt="3D Medical Illustration"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-1/4 right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute bottom-1/3 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            </div>

          </div>
        </div>
      </div>
    </>
  );
};
