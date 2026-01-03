import { useState, useImperativeHandle, forwardRef } from 'react';
import { DEPARTMENTS, LOCATIONS, EQUIPMENT_OPTIONS } from '../config/constants';
import { useOnboardingSubmit } from '../hooks/useOnboardingSubmit';

const NewOnboardingForm = forwardRef(({ onSuccess }, ref) => {
  const { submitOnboarding, isSubmitting, error, resetError } = useOnboardingSubmit();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    personal_email: '',
    department: '',
    title: '',
    manager_name: '',
    manager_email: '',
    start_date: '',
    location: '',
    equipment_needed: [],
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'first_name':
      case 'last_name':
        return !value.trim() ? 'This field is required' : '';
      case 'personal_email':
      case 'manager_email':
        if (!value.trim()) return name === 'personal_email' ? 'This field is required' : '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Invalid email format' : '';
      case 'department':
        return !value ? 'Please select a department' : '';
      case 'start_date':
        if (!value) return 'This field is required';
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate < today ? 'Start date must be today or in the future' : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      // Handle equipment checkboxes
      const equipmentId = value;
      setFormData((prev) => ({
        ...prev,
        equipment_needed: checked
          ? [...prev.equipment_needed, equipmentId]
          : prev.equipment_needed.filter((id) => id !== equipmentId),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Validate on change if field was touched
      if (touched[name]) {
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    }

    if (error) resetError();
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['first_name', 'last_name', 'personal_email', 'department', 'start_date'];

    requiredFields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    // Validate optional email fields if filled
    if (formData.manager_email) {
      const error = validateField('manager_email', formData.manager_email);
      if (error) newErrors.manager_email = error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = {};
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    if (!validateForm()) {
      return;
    }

    try {
      const response = await submitOnboarding(formData);
      if (onSuccess) {
        onSuccess(response);
      }
    } catch (err) {
      // Error handled by hook
    }
  };

  const setFormValues = (values) => {
    setFormData(values);
    setErrors({});
    setTouched({});
  };

  // Expose setFormValues to parent component via ref
  useImperativeHandle(ref, () => ({
    setFormValues
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-text-dark mb-6">New Hire Information</h3>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-error rounded-md">
          <p className="text-error text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name <span className="text-error">*</span>
          </label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent ${
              errors.first_name && touched.first_name ? 'border-error' : 'border-gray-300'
            }`}
          />
          {errors.first_name && touched.first_name && (
            <p className="text-error text-xs mt-1">{errors.first_name}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name <span className="text-error">*</span>
          </label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent ${
              errors.last_name && touched.last_name ? 'border-error' : 'border-gray-300'
            }`}
          />
          {errors.last_name && touched.last_name && (
            <p className="text-error text-xs mt-1">{errors.last_name}</p>
          )}
        </div>

        {/* Personal Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Personal Email <span className="text-error">*</span>
          </label>
          <input
            type="email"
            name="personal_email"
            value={formData.personal_email}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent ${
              errors.personal_email && touched.personal_email ? 'border-error' : 'border-gray-300'
            }`}
          />
          {errors.personal_email && touched.personal_email && (
            <p className="text-error text-xs mt-1">{errors.personal_email}</p>
          )}
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department <span className="text-error">*</span>
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent ${
              errors.department && touched.department ? 'border-error' : 'border-gray-300'
            }`}
          >
            <option value="">Select a department</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && touched.department && (
            <p className="text-error text-xs mt-1">{errors.department}</p>
          )}
        </div>

        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Manager Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Manager Name</label>
          <input
            type="text"
            name="manager_name"
            value={formData.manager_name}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Manager Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Manager Email</label>
          <input
            type="email"
            name="manager_email"
            value={formData.manager_email}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent ${
              errors.manager_email && touched.manager_email ? 'border-error' : 'border-gray-300'
            }`}
          />
          {errors.manager_email && touched.manager_email && (
            <p className="text-error text-xs mt-1">{errors.manager_email}</p>
          )}
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date <span className="text-error">*</span>
          </label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent ${
              errors.start_date && touched.start_date ? 'border-error' : 'border-gray-300'
            }`}
          />
          {errors.start_date && touched.start_date && (
            <p className="text-error text-xs mt-1">{errors.start_date}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="">Select a location</option>
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Equipment Needed */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Equipment Needed</label>
          <div className="space-y-2">
            {EQUIPMENT_OPTIONS.map((equipment) => (
              <label key={equipment.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={equipment.id}
                  checked={formData.equipment_needed.includes(equipment.id)}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-4 h-4 text-accent focus:ring-accent border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{equipment.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent hover:bg-accent-light text-white font-medium py-3 px-6 rounded-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Starting...
            </>
          ) : (
            <>Start Onboarding →</>
          )}
        </button>
      </form>
    </div>
  );
});

NewOnboardingForm.displayName = 'NewOnboardingForm';

export default NewOnboardingForm;
