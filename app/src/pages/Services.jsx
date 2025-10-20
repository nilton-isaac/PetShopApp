import React from 'react';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import InputField from '../components/InputField.jsx';

const services = [
  {
    id: 'svc-1',
    title: 'Banho & Tosa',
    description: 'Agende cuidados com profissionais certificados e acompanhamento em tempo real.',
    icon: 'shower',
  },
  {
    id: 'svc-2',
    title: 'Veterinários',
    description: 'Consultas presenciais, atendimento 24h e teleorientação integrada.',
    icon: 'medical_services',
  },
  {
    id: 'svc-3',
    title: 'Pet Hotel & Creche',
    description: 'Hospedagem monitorada para viagens e rotina de socialização segura.',
    icon: 'hotel',
  },
  {
    id: 'svc-4',
    title: 'Passeios guiados',
    description: 'Passeadores avaliados com rotas favoritas e registro de atividades.',
    icon: 'hiking',
  },
  {
    id: 'svc-5',
    title: 'Treinamento',
    description: 'Adestradores parceiros com planos personalizados e relatórios semanais.',
    icon: 'psychology',
  },
  {
    id: 'svc-6',
    title: 'Produtos essenciais',
    description: 'Entrega recorrente de ração, medicamentos e itens de bem-estar.',
    icon: 'shopping_bag',
  },
];

export default function Services() {
  return (
    <div className="section services-page">
      <InputField
        id="service-search"
        className="services-page__search"
        label="Buscar serviços"
        icon={<span className="material-symbols-outlined">search</span>}
        inputProps={{ placeholder: 'Procure por parceiros ou categorias' }}
      />

      <div className="services-grid">
        {services.map((service) => (
          <Card key={service.id} tonal className="service-card">
            <div className="service-card__icon" aria-hidden="true">
              <span className="material-symbols-outlined">{service.icon}</span>
            </div>
            <div className="service-card__content">
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__description">{service.description}</p>
            </div>
            <Button
              variant="secondary"
              size="small"
              className="service-card__action"
              aria-label={`Adicionar ${service.title}`}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                add
              </span>
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
