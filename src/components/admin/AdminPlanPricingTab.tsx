import React, { useState, useEffect } from 'react';
import { Button, Loader, NumberInput, Title } from '@mantine/core';
import { message } from '@/lib/notify';
import { adminAPI } from '@/lib/api';
import SectionCard from '@/components/common/SectionCard';

type PriceField = 'basicMonthly' | 'basicYearly' | 'proMonthly' | 'proYearly';
type PriceValues = Record<PriceField, number | string>;
type PriceErrors = Partial<Record<PriceField, string>>;

const EMPTY_PRICES: PriceValues = { basicMonthly: '', basicYearly: '', proMonthly: '', proYearly: '' };

const PLAN_SECTIONS: { title: string; fields: { name: PriceField; label: string; placeholder: string }[] }[] = [
  {
    title: 'Basic Plan',
    fields: [
      { name: 'basicMonthly', label: 'Monthly Price (₹)', placeholder: '149' },
      { name: 'basicYearly', label: 'Yearly Price (₹)', placeholder: '1700' },
    ],
  },
  {
    title: 'Pro Plan',
    fields: [
      { name: 'proMonthly', label: 'Monthly Price (₹)', placeholder: '299' },
      { name: 'proYearly', label: 'Yearly Price (₹)', placeholder: '3500' },
    ],
  },
];

const validatePrices = (values: PriceValues): PriceErrors => {
  const errors: PriceErrors = {};
  (Object.keys(values) as PriceField[]).forEach((field) => {
    if (values[field] === '') errors[field] = 'Please enter a price';
    else if (!(Number(values[field]) > 0)) errors[field] = 'Price must be a positive number';
  });
  return errors;
};

const AdminPlanPricingTab: React.FC = () => {
  const [values, setValues] = useState<PriceValues>(EMPTY_PRICES);
  const [errors, setErrors] = useState<PriceErrors>({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    fetchCurrentPrices();
  }, []);

  const fetchCurrentPrices = async () => {
    try {
      setFetchLoading(true);
      const response = await adminAPI.getPlanPrices();
      if (response.success) {
        const { basic, pro } = response.prices;
        setValues({
          basicMonthly: basic.monthlyPrice,
          basicYearly: basic.yearlyPrice,
          proMonthly: pro.monthlyPrice,
          proYearly: pro.yearlyPrice,
        });
      }
    } catch (error) {
      message.error('Failed to fetch current prices');
    } finally {
      setFetchLoading(false);
    }
  };

  const setField = (field: PriceField, value: number | string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validatePrices(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      setLoading(true);
      const payload = {
        basic: {
          monthlyPrice: Number(values.basicMonthly),
          yearlyPrice: Number(values.basicYearly),
        },
        pro: {
          monthlyPrice: Number(values.proMonthly),
          yearlyPrice: Number(values.proYearly),
        },
      };

      const response = await adminAPI.updatePlanPrices(payload);
      if (response.success) {
        message.success('Plan prices updated successfully');
        fetchCurrentPrices();
      } else {
        message.error('Failed to update prices');
      }
    } catch (error) {
      message.error('Failed to update plan prices');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader />
      </div>
    );
  }

  return (
    <SectionCard title="Plan Pricing Management">
      <form onSubmit={handleSubmit} className="max-w-2xl" noValidate>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PLAN_SECTIONS.map((section) => (
            <div key={section.title} className="space-y-4">
              <Title order={4}>{section.title}</Title>
              {section.fields.map((field) => (
                <NumberInput
                  key={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  min={1}
                  allowDecimal={false}
                  allowNegative={false}
                  hideControls
                  value={values[field.name]}
                  onChange={(value) => setField(field.name, value)}
                  error={errors[field.name]}
                />
              ))}
            </div>
          ))}
        </div>

        <Button type="submit" loading={loading} size="md" className="mt-6">
          Update Prices
        </Button>
      </form>
    </SectionCard>
  );
};

export default AdminPlanPricingTab;
