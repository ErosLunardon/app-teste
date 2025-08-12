# app-teste (React Native + Expo)

Aplicativo móvel usando Expo, TypeScript, React Navigation (Drawer), NativeWind (Tailwind para RN), Safe Area Context e Reanimated.

## Sumário
- Visão geral
- Stack
- Pré-requisitos
- Instalação
- Executando (Android/Expo Go)
- Estrutura de pastas
- Navegação (Drawer)
- Estilização com NativeWind
- Configurações importantes (Babel, aliases)
- Solução de problemas comuns
- Comandos úteis (Git)

---

## Visão geral
Este projeto contém uma navegação do tipo Drawer com duas telas base:
- Home
- Settings

O objetivo é servir de base para apps com navegação, estilização utilitária via NativeWind e boas práticas de configuração do Babel e aliases de importação.

## Stack
- Expo (React Native)
- TypeScript
- React Navigation Drawer
- react-native-safe-area-context
- react-native-reanimated
- NativeWind (Tailwind para React Native)

## Pré-requisitos
- Node.js LTS
- Git
- Expo CLI (opcional, pode usar npx)
- Android Studio (para emulador Android) ou um dispositivo físico com Expo Go

## Instalação
```bash
# clonar
git clone git@github.com:ErosLunardon/app-teste.git
cd app-teste

# instalar dependências
npm install
# ou
yarn
# ou
pnpm install
```

## Executando
```bash
# limpar cache do Metro (recomendado na primeira execução)
npx expo start -c
```

- Pressione:
  - a para abrir no Android (emulador)
  - w para Web (se habilitado)
- Em dispositivo físico Android, abra o app “Expo Go” e escaneie o QR code.

## Estrutura de pastas (parcial)
```
c:\workspace\app-teste
├─ src
│  ├─ components
│  │  └─ buttons
│  │     └─ MenuButton.tsx
│  ├─ navigation
│  │  ├─ DrawerNavigator.tsx
│  │  └─ routes.ts
│  └─ screens
│     ├─ Home.tsx
│     └─ Settings.tsx
├─ App.tsx
├─ babel.config.js
└─ package.json
```

## Navegação (Drawer)
Exemplo resumido do Drawer:
```ts
// src/navigation/DrawerNavigator.tsx
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Home } from "../screens/Home";
import { Settings } from "../screens/Settings";
import { Routes } from "./routes";

const Drawer = createDrawerNavigator<Routes>();

export const DrawerNavigator: React.FC = () => (
  <Drawer.Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
    <Drawer.Screen name="home" component={Home} />
    <Drawer.Screen name="settings" component={Settings} />
  </Drawer.Navigator>
);
```

## Estilização com NativeWind
O projeto está configurado para usar NativeWind. Em componentes, você pode usar a prop `className`:
```tsx
<View className="flex-1 items-center justify-center bg-white">
  <Text className="text-xl font-semibold">Hello</Text>
</View>
```

## Configurações importantes

### Babel
Mantenha o plugin do Reanimated por último:
```js
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: { "@": "./src" },
        },
      ],
      'react-native-reanimated/plugin', // precisa ser o último
    ],
  };
};
```

### Aliases
O alias `@` aponta para `./src`. Exemplo:
```ts
import { MenuButton } from "@/components/buttons/MenuButton";
```

## Solução de problemas comuns

- Error: Element type is invalid (got: object)
  - Verifique se o componente foi exportado/importado corretamente:
    - Export default → `import MenuButton from "...";`
    - Export nomeado → `import { MenuButton } from "...";`

- Unable to resolve "react-native-reanimated" from "App.tsx"
  - Garanta que a dependência está instalada:
    ```bash
    npm i react-native-reanimated
    ```
  - Confirme o plugin no `babel.config.js` e que ele está por último.
  - Limpe o cache e reinicie:
    ```bash
    npx expo start -c
    ```

- Problemas de Metro cache / bundling
  ```bash
  npx expo start -c
  ```

- Emulador Android não abre
  - Abra o Android Studio → Device Manager → inicie um AVD antes de rodar `a`.

- Requisições a um backend local no Android emulador
  - Use `http://10.0.2.2:<porta>` em vez de `http://localhost`.

## Comandos úteis (Git)

- Configurar usuário apenas neste repositório:
```bash
git config user.name "ErosLunardon"
git config user.email "eros.lunardon@bikefacil.com"
```

- Ajustar remote para SSH:
```bash
git remote remove origin
git remote add origin git@github.com:ErosLunardon/app-teste.git
git push -u origin main
```

- Gerar chave SSH (caso necessário) e adicionar no GitHub:
```bash
ssh-keygen -t ed25519 -C "eros.lunardon@bikefacil.com"
# depois adicione o conteúdo de ~/.ssh/id_ed25519.pub em GitHub → Settings → SSH and GPG keys
```

---

Sinta-se à vontade para ajustar este README conforme o projeto
