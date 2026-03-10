# Container/Presentational Pattern

Este diretório contém exemplos e implementações do padrão Container/Presentational conforme [patterns.dev](https://www.patterns.dev/react/presentational-container-pattern/).

## O que é o Padrão Container/Presentational?

O padrão Container/Presentational separa a **lógica de aplicação** (o quê) da **lógica de apresentação** (como).

### Componentes Presentacionais (Presentational Components)

- **Responsabilidade**: Como os dados são exibidos
- **Características**:
  - Recebem dados via `props`
  - Não modificam os dados recebidos
  - Geralmente são stateless (sem estado próprio)
  - Focam apenas na renderização e estilos
  - Fáceis de testar (pure functions)

### Componentes Container (Container Components)

- **Responsabilidade**: O quê de dados é exibido
- **Características**:
  - Gerenciam estado e lógica de aplicação
  - Fazem fetch de dados
  - Passam dados para componentes presentacionais
  - Não renderizam nada além dos componentes presentacionais
  - Geralmente não têm estilos próprios

## Exemplo Clássico

### Presentational Component

```tsx
// ZApiFeatureImages.tsx - Presentational
function ZApiFeatureImages({ images }: { images: string[] }) {
  return images.map((img, i) => <img src={img} key={i} alt="Feature Z-API" />);
}
```

### Container Component

```tsx
// ZApiFeatureImagesContainer.tsx - Container
class ZApiFeatureImagesContainer extends React.Component {
  state = { images: [] };

  componentDidMount() {
    // Por padrão, usa imagens estáticas do projeto
    this.setState({ images: ['/img/Status1.jpeg', '/img/Status2.jpeg'] });
    
    // Ou fazer fetch de API:
    // fetch("/api/feature-images")
    //   .then(res => res.json())
    //   .then(data => this.setState({ images: data }));
  }

  render() {
    return <ZApiFeatureImages images={this.state.images} />;
  }
}
```

## Abordagem Moderna com Hooks (Recomendada)

No React 18+, **Hooks são preferidos sobre Container Components**:

```tsx
// useZApiFeatureImages.ts - Custom Hook
function useZApiFeatureImages() {
  const [images, setImages] = useState([
    '/img/Status1.jpeg',
    '/img/Status2.jpeg',
    '/img/Status3.jpeg'
  ]);

  // Por padrão, usa imagens estáticas do projeto
  // Pode fazer fetch se necessário:
  // useEffect(() => {
  //   fetch("/api/feature-images")
  //     .then(res => res.json())
  //     .then(data => setImages(data));
  // }, []);

  return images;
}

// ZApiFeatureImages.tsx - Presentational com Hook
function ZApiFeatureImages() {
  const images = useZApiFeatureImages();
  return images.map((img, i) => <img src={img} key={i} alt="Feature Z-API" />);
}
```

## Quando Usar Cada Abordagem

### Use Container/Presentational quando:
- Você precisa separar lógica de dados de apresentação
- Quer facilitar testes de componentes presentacionais
- Precisa reutilizar componentes presentacionais com diferentes fontes de dados
- Trabalha com equipes onde designers podem modificar componentes presentacionais

### Use Hooks quando:
- Você quer evitar componentes de classe
- Prefere menos nesting (sem wrapper components)
- Quer melhor debugging no React DevTools
- Está usando React 18+ (recomendação oficial)

## Estrutura de Arquivos

```
container-presentational/
├── README.md                    # Este arquivo
├── examples/                    # Exemplos práticos
│   └── ZApiFeatureImages/      # Exemplo usando imagens reais do projeto
│       ├── ZApiFeatureImages.tsx        # Presentational
│       ├── ZApiFeatureImagesContainer.tsx # Container (clássico)
│       ├── useZApiFeatureImages.ts      # Hook (moderno)
│       ├── ZApiFeatureImagesWithHook.tsx # Presentational com Hook
│       ├── styles.module.css           # Estilos
│       ├── index.ts                    # Exports
│       └── __tests__/                   # Testes
│           └── ZApiFeatureImages.test.tsx
└── patterns/                    # Padrões aplicados no projeto
    ├── DeveloperHub/
    │   ├── useDeveloperHub.ts
    │   ├── DeveloperHubContainer.tsx
    │   └── __tests__/
    ├── LearningResources/
    │   └── useLearningResources.ts
    └── HomepageFeatures/
        └── useHomepageFeatures.ts
```

## Referências

- [Container/Presentational Pattern - patterns.dev](https://www.patterns.dev/react/presentational-container-pattern/)
- [Presentational and Container Components - Dan Abramov](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
