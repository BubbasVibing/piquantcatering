'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDownload,
  faExternalLinkAlt,
  faUsers,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import FormModal from '@/components/FormModal/FormModal';
import { cateringPackages } from '@/data/cateringPackages';
import type { CateringPackage, FormField } from '@/types/content';
import '@/styles/menus.css';

const MENU_PDF_PATH = `/assets/menu2/${encodeURIComponent('PiquantCateringMenu - Master.pdf')}`;

const PACKAGE_FIELDS: FormField[] = [
  { name: 'name', label: 'Your Name', type: 'text', required: true, fullWidth: true },
  { name: 'email', label: 'Email Address', type: 'email', required: true },
  { name: 'phone', label: 'Phone Number', type: 'tel' },
  {
    name: 'event_type',
    label: 'Type of Event',
    type: 'select',
    required: true,
    options: ['Wedding', 'Birthday Celebration', 'Corporate Event', 'Anniversary', 'Other'],
  },
  { name: 'guest_count', label: 'Estimated Guest Count', type: 'text', required: true },
  { name: 'event_date', label: 'Tentative Event Date', type: 'text', required: true },
  {
    name: 'message',
    label: 'Anything else we should know?',
    type: 'textarea',
    placeholder: 'Tell us about your event...',
    fullWidth: true,
  },
];

const CUSTOM_FIELDS: FormField[] = [
  { name: 'name', label: 'Your Name', type: 'text', required: true, fullWidth: true },
  { name: 'email', label: 'Email Address', type: 'email', required: true },
  { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
  {
    name: 'event_type',
    label: 'Type of Event',
    type: 'select',
    required: true,
    options: ['Wedding', 'Corporate Event', 'Private Dining', 'Themed Celebration', 'Other'],
  },
  {
    name: 'price_range',
    label: 'Budget Range',
    type: 'select',
    required: true,
    options: [
      'Economy ($75-150/person)',
      'Mid-Range ($150-300/person)',
      'Premium ($300-500/person)',
      'Luxury (Over $500/person)',
    ],
  },
  { name: 'guest_count', label: 'Estimated Guest Count', type: 'text', required: true },
  { name: 'event_date', label: 'Tentative Event Date', type: 'text', required: true },
  {
    name: 'cuisine_preference',
    label: 'Cuisine Preference',
    type: 'select',
    required: true,
    options: [
      'Nigerian Cuisine',
      'Pan-African',
      'African Fusion',
      'International',
      'Mixed Cuisines',
    ],
  },
  {
    name: 'dietary_requirements',
    label: 'Dietary Requirements',
    type: 'textarea',
    placeholder: 'Any allergies or restrictions?',
    rows: 2,
    fullWidth: true,
  },
  {
    name: 'menu_vision',
    label: 'Menu Vision',
    type: 'textarea',
    placeholder: 'Describe your vision for the menu...',
    required: true,
    rows: 3,
    fullWidth: true,
  },
];

export default function MenusClient() {
  const [selectedPackage, setSelectedPackage] = useState<CateringPackage | null>(null);
  const [customOpen, setCustomOpen] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = MENU_PDF_PATH;
    link.download = 'PiquantCateringMenu.pdf';
    link.click();
  };

  return (
    <div className="menus-page">
      <section className="menu-hero-section">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>OUR MENU</h1>
          <p>Exquisite dishes for your catering needs</p>
        </div>
      </section>

      <section className="menu-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Menu</h2>
            <p>Browse our complete catering menu below</p>
          </div>

          <div className="menu-viewer animate-section">
            <div className="menu-actions">
              <a
                href={MENU_PDF_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="menu-action-btn menu-action-primary"
              >
                <FontAwesomeIcon icon={faExternalLinkAlt} />
                <span>View Full Menu</span>
              </a>
              <button
                type="button"
                className="menu-action-btn menu-action-secondary"
                onClick={handleDownload}
              >
                <FontAwesomeIcon icon={faDownload} />
                <span>Download PDF</span>
              </button>
            </div>

            <div className="menu-embed-wrapper">
              <iframe
                src={`${MENU_PDF_PATH}#toolbar=1&navpanes=0&scrollbar=1&zoom=50`}
                title="Piquant Catering Menu"
                className="menu-embed-iframe"
              />
            </div>

            <p className="menu-mobile-hint">
              Tap &quot;View Full Menu&quot; above to browse our menu with full zoom and scroll
              support.
            </p>
          </div>
        </div>
      </section>

      <section className="catering-packages-section">
        <div className="container">
          <div className="section-header">
            <h2>Catering Packages</h2>
            <div className="decorative-line" />
            <p>Choose from our carefully curated catering packages to suit your event needs</p>
          </div>

          <div className="packages-grid animate-section">
            {cateringPackages.map((pkg) => (
              <article
                key={pkg.id}
                className={`package-card ${pkg.recommended ? 'recommended' : ''}`}
              >
                {pkg.recommended && <div className="recommended-badge">Most Popular</div>}
                <div className="package-image">
                  <Image src={pkg.image} alt={pkg.title} width={500} height={350} />
                </div>
                <div className="package-content">
                  <h3>{pkg.title}</h3>
                  <p className="package-description">{pkg.description}</p>
                  <p className="package-price">{pkg.price}</p>
                  <ul className="package-features">
                    {pkg.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="package-button"
                    onClick={() => setSelectedPackage(pkg)}
                  >
                    Select Package
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="custom-menu-section">
        <div className="container">
          <div className="custom-menu-content">
            <div className="custom-menu-text">
              <h2>Need a Custom Menu?</h2>
              <p>
                We understand that each event is unique. Our culinary team can create a customized
                menu tailored specifically to your preferences, dietary requirements, and event
                theme.
              </p>
              <div className="custom-menu-features">
                <div className="custom-feature">
                  <FontAwesomeIcon icon={faUserTie} />
                  <span>Personal Chef Consultation</span>
                </div>
                <div className="custom-feature">
                  <FontAwesomeIcon icon={faUsers} />
                  <span>Accommodates Any Event Size</span>
                </div>
              </div>
              <button
                type="button"
                className="custom-menu-button"
                onClick={() => setCustomOpen(true)}
              >
                Request Custom Menu
              </button>
            </div>
            <div className="custom-menu-image">
              <Image
                src="/assets/custommenurequest.png"
                alt="Chef preparing custom dishes"
                width={700}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>

      <FormModal
        open={selectedPackage !== null}
        onClose={() => setSelectedPackage(null)}
        title={selectedPackage ? `${selectedPackage.title} Inquiry` : ''}
        subtitle={selectedPackage?.description}
        fields={PACKAGE_FIELDS}
        subject={selectedPackage ? `${selectedPackage.title} Package Inquiry` : ''}
        submitLabel="Submit Inquiry"
        successMessage="We have received your package inquiry. Our catering team will reach out within 48 hours."
        extraFields={selectedPackage ? { package: selectedPackage.title } : undefined}
      />

      <FormModal
        open={customOpen}
        onClose={() => setCustomOpen(false)}
        title="Custom Menu Request"
        subtitle="Tell us about your unique culinary vision"
        fields={CUSTOM_FIELDS}
        subject="Custom Menu Request"
        submitLabel="Submit Request"
        successMessage="Thank you! Our culinary team will contact you within 48 hours to begin shaping your custom menu."
      />
    </div>
  );
}
