import React from 'react';
import { Input } from '@/components/Input/Input';
import { Button } from '@/components/Button/Button';
import { Select } from '@/components/Select/Select';
import { FileUpload } from '@/components/FileUpload/FileUpload';
import { Checkbox } from '@/components/Checkbox/Checkbox';
import { usePatientForm } from '../hooks/usePatientForm';

export const PatientFormPage = () => {
  const { formData, errors, isLoading, handleChange, handleFileChange, handleSubmit } = usePatientForm();

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
    <div className="min-h-screen bg-dark py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* ==================== UNE SEULE CARD QUI CONTIENT TOUT ==================== */}
        <div className="bg-dark-light rounded-2xl border border-dark-lighter shadow-xl overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* ==================== PARTIE GAUCHE : FORMULAIRE ==================== */}
            <div className="p-8 lg:p-10">
              
              {/* Logo */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">+</span>
                </div>
                <span className="text-white text-2xl font-bold">CarePulse</span>
              </div>

              {/* Titre */}
              <h1 className="text-white text-3xl font-bold mb-2">
                Welcome 👋
              </h1>
              <p className="text-gray-secondary mb-10">
                Let us know more about yourself
              </p>

              {/* Formulaire */}
              <form onSubmit={handleSubmit} className="space-y-10">
                
                {/* ==================== PERSONAL INFORMATION ==================== */}
                <section>
                  <h2 className="text-white text-xl font-bold mb-6">
                    Personal Information
                  </h2>
                  
                  <div className="space-y-5">
                    {/* Full name */}
                    <Input
                      label="Full name"
                      name="nomComplet"
                      type="text"
                      placeholder="ex. Adrian"
                      value={formData.nomComplet}
                      onChange={handleChange}
                      error={errors.nomComplet}
                    />

                    {/* Email & Phone */}
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

                    {/* Date of birth & Gender */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Input
                        label="Date of birth"
                        name="dateNaissance"
                        type="date"
                        placeholder="Select your birth date"
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

                    {/* Address & Occupation */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Input
                        label="Address"
                        name="adresse"
                        type="text"
                        placeholder="ex. 14 street, New York, NY - 5101"
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

                    {/* Emergency contact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Input
                        label="Emergency contact name"
                        name="nomContactUrgence"
                        type="text"
                        placeholder="Guardian's name"
                        value={formData.nomContactUrgence}
                        onChange={handleChange}
                        error={errors.nomContactUrgence}
                      />
                      <Input
                        label="Phone number"
                        name="telephoneContactUrgence"
                        type="tel"
                        placeholder="ex. +1 (868) 579-9631"
                        value={formData.telephoneContactUrgence}
                        onChange={handleChange}
                        error={errors.telephoneContactUrgence}
                      />
                    </div>
                  </div>
                </section>

                {/* ==================== MEDICAL INFORMATION ==================== */}
                <section>
                  <h2 className="text-white text-xl font-bold mb-6">
                    Medical Information
                  </h2>
                  
                  <div className="space-y-5">
                    {/* Primary care physician */}
                    <Select
                      label="Primary care physician"
                      name="medecinTraitant"
                      options={docteurs}
                      placeholder="Select a doctor"
                      value={formData.medecinTraitant}
                      onChange={handleChange}
                      error={errors.medecinTraitant}
                    />

                    {/* Insurance provider & Policy number */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Input
                        label="Insurance provider"
                        name="fournisseurAssurance"
                        type="text"
                        placeholder="ex. BlueCross"
                        value={formData.fournisseurAssurance}
                        onChange={handleChange}
                        error={errors.fournisseurAssurance}
                      />
                      <Input
                        label="Insurance policy number"
                        name="numeroPoliceAssurance"
                        type="text"
                        placeholder="ex. ABC123456"
                        value={formData.numeroPoliceAssurance}
                        onChange={handleChange}
                        error={errors.numeroPoliceAssurance}
                      />
                    </div>

                    {/* Allergies & Current medications */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Input
                        label="Allergies (if any)"
                        name="allergies"
                        type="text"
                        placeholder="ex. Peanuts, Penicillin, Pollen"
                        value={formData.allergies}
                        onChange={handleChange}
                        error={errors.allergies}
                      />
                      <Input
                        label="Current medications"
                        name="medicamentsActuels"
                        type="text"
                        placeholder="ex. Ibuprofen 200mg, Levothyroxine 50mcg"
                        value={formData.medicamentsActuels}
                        onChange={handleChange}
                        error={errors.medicamentsActuels}
                      />
                    </div>

                    {/* Family & Past medical history */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Input
                        label="Family medical history (if relevant)"
                        name="antecedentsFamiliaux"
                        type="text"
                        placeholder="ex. Mother had breast cancer"
                        value={formData.antecedentsFamiliaux}
                        onChange={handleChange}
                        error={errors.antecedentsFamiliaux}
                      />
                      <Input
                        label="Past medical history"
                        name="antecedentsMedicaux"
                        type="text"
                        placeholder="ex. Asthma diagnosis in childhood"
                        value={formData.antecedentsMedicaux}
                        onChange={handleChange}
                        error={errors.antecedentsMedicaux}
                      />
                    </div>
                  </div>
                </section>

                {/* ==================== IDENTIFICATION AND VERIFICATION ==================== */}
                <section>
                  <h2 className="text-white text-xl font-bold mb-6">
                    Identification and Verification
                  </h2>
                  
                  <div className="space-y-5">
                    {/* Identification type */}
                    <Select
                      label="Identification type"
                      name="typeIdentification"
                      options={identificationTypes}
                      placeholder="Select identification type"
                      value={formData.typeIdentification}
                      onChange={handleChange}
                      error={errors.typeIdentification}
                    />

                    {/* Identification number */}
                    <Input
                      label="Identification Number"
                      name="numeroIdentification"
                      type="text"
                      placeholder="ex 1234567"
                      value={formData.numeroIdentification}
                      onChange={handleChange}
                      error={errors.numeroIdentification}
                    />

                    {/* File upload */}
                    <FileUpload
                      label="Scanned Copy of Identification Document"
                      onChange={handleFileChange}
                      error={errors.documentIdentification}
                    />
                  </div>
                </section>

                {/* ==================== CONSENT AND PRIVACY ==================== */}
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
                      label="I consent to the use and disclosure of my health information for treatment purposes."
                    />
                    <Checkbox
                      name="consentementDivulgation"
                      checked={formData.consentementDivulgation}
                      onChange={handleChange}
                      label="I acknowledge that I have reviewed and agree to the privacy policy."
                    />
                  </div>
                </section>

                {/* Submit button */}
                <Button type="submit" isLoading={isLoading}>
                  Submit and continue
                </Button>
              </form>
            </div>

            {/* ==================== PARTIE DROITE : IMAGE 3D ==================== */}
<div className="hidden lg:block relative bg-[#0D0F10] overflow-hidden">
  {/* Image qui occupe TOUT */}
  <img
    src="https://images.pexels.com/photos/3279197/pexels-photo-3279197.jpeg"
    alt="3D Medical Illustration"
    className="absolute inset-0 w-full h-full object-cover opacity-80"
  />
  
  {/* Formes décoratives */}
  <div className="absolute top-1/4 right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse" />
  <div className="absolute bottom-1/3 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
</div>

          </div>
        </div>

      </div>
    </div>
  );
};

