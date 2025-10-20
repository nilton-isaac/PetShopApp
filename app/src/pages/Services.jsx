import React from 'react';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';

const categorias = [
  {
    id: 'svc-1',
    title: 'Banho & Tosa',
    description: 'Parceiros certificados, atendimento com hora marcada e acompanhamento pelo app.',
  },
  {
    id: 'svc-2',
    title: 'Veterinários',
    description: 'Clínicas e profissionais 24h que aceitam transporte assistido e teleorientação.',
  },
  {
    id: 'svc-3',
    title: 'Pet Hotel & Creche',
    description: 'Locais com monitoramento ao vivo e integração com diário do pet.',
  },
];

export default function Services() {
  return (
    <div className="section">
      {categorias.map((categoria) => (
        <Card key={categoria.id}>
          <h3 className="section-title">{categoria.title}</h3>
          <p>{categoria.description}</p>
          <div className="flow-actions">
            <Button variant="primary" size="small">
              Ver parceiros
            </Button>
            <Button variant="ghost" size="small">
              Solicitar corrida
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
