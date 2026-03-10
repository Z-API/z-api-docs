/**
 * Exemplo de uso do HeroSectionCompound - Compound Pattern
 * 
 * Demonstra como usar o HeroSection com sub-componentes seguindo o padrão Compound.
 */

import { Globe, Rocket, Users } from 'lucide-react';
import HeroSectionCompound from './HeroSectionCompound';

/**
 * Exemplo 1: Uso básico com sub-componentes
 */
export function HeroSectionBasicExample() {
  return (
    <HeroSectionCompound theme="official" layout="left">
      <HeroSectionCompound.Label>Central do Desenvolvedor</HeroSectionCompound.Label>
      <HeroSectionCompound.Title>
        Conecte seu sistema ao Z-API, a API WhatsApp mais estável do Brasil
      </HeroSectionCompound.Title>
      <HeroSectionCompound.Subtitle>
        Se você desenvolve software, Z-API é a solução para integrar atendimento, notificações e automações via WhatsApp com suporte técnico nacional, documentação clara e parceria de verdade.
      </HeroSectionCompound.Subtitle>
      <HeroSectionCompound.CTAs>
        <HeroSectionCompound.CTA primary to="/docs/quick-start/introducao">
          Começar grátis
        </HeroSectionCompound.CTA>
        <HeroSectionCompound.CTA to="/docs/intro">
          Ver documentação
        </HeroSectionCompound.CTA>
      </HeroSectionCompound.CTAs>
      <HeroSectionCompound.Stats>
        <HeroSectionCompound.Stat value="+60.000" label="clientes" icon={Users} />
        <HeroSectionCompound.Stat value="79" label="países" icon={Globe} />
        <HeroSectionCompound.Stat value="24/7" label="suporte nacional" icon={Rocket} />
      </HeroSectionCompound.Stats>
      <HeroSectionCompound.Terminal />
    </HeroSectionCompound>
  );
}

/**
 * Exemplo 2: Uso mínimo (apenas título e CTA)
 */
export function HeroSectionMinimalExample() {
  return (
    <HeroSectionCompound theme="classic" layout="center">
      <HeroSectionCompound.Title>
        Bem-vindo ao Z-API Central
      </HeroSectionCompound.Title>
      <HeroSectionCompound.CTAs>
        <HeroSectionCompound.CTA primary to="/docs/intro">
          Começar agora
        </HeroSectionCompound.CTA>
      </HeroSectionCompound.CTAs>
    </HeroSectionCompound>
  );
}

/**
 * Exemplo 3: Uso com tema híbrido e layout split
 */
export function HeroSectionHybridExample() {
  return (
    <HeroSectionCompound theme="hybrid" layout="split" size="expanded">
      <HeroSectionCompound.Label>Nova Funcionalidade</HeroSectionCompound.Label>
      <HeroSectionCompound.Title>
        Descubra o poder da Z-API
      </HeroSectionCompound.Title>
      <HeroSectionCompound.Subtitle>
        Integre WhatsApp em minutos com nossa API simples e poderosa.
      </HeroSectionCompound.Subtitle>
      <HeroSectionCompound.CTAs>
        <HeroSectionCompound.CTA primary to="/docs/quick-start/introducao">
          Começar grátis
        </HeroSectionCompound.CTA>
        <HeroSectionCompound.CTA to="/docs/intro">
          Ver documentação
        </HeroSectionCompound.CTA>
      </HeroSectionCompound.CTAs>
      <HeroSectionCompound.Terminal />
    </HeroSectionCompound>
  );
}
