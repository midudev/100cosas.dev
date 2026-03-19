---
id: "89"
title: "El contexto lo es todo: no hay mejores prácticas universales"
category: "Mentalidad"
categoryColor: "text-cyan-400 bg-cyan-900/20"
author: "kent-c-dodds"
---

**Lo que funciona para Google probablemente no funciona para tu equipo de tres personas.** Kent C. Dodds, creador de Testing Library y una de las voces más influyentes del ecosistema React, acuñó un término para combatir el dogmatismo: *AHA Programming* (Avoid Hasty Abstractions). Su mensaje es claro: *"Every best practice has a context where it's the worst practice."*

Dodds ha construido su carrera cuestionando las "verdades absolutas" del desarrollo. No por rebeldía, sino por pragmatismo. Cuando alguien dice "siempre deberías hacer X", Dodds pregunta: "¿Para qué contexto?" Y casi siempre, la respuesta honesta es "depende".

## "Mejores prácticas" que dependen del contexto

Muchos consejos que se repiten como dogmas son excelentes en un contexto y terribles en otro:

```markdown
Microservicios
  ✅ Netflix (miles de devs, millones de usuarios, equipos independientes)
  ❌ Tu MVP con 3 devs y 100 usuarios → Un monolito te irá 10x mejor

Cobertura de tests al 100%
  ✅ Librería open source usada por miles (React, lodash)
  ❌ Prototipo para validar idea → Estás testeando código que vas a tirar

TypeScript estricto
  ✅ Equipo grande, código longevo, API pública
  ❌ Script de 50 líneas que se ejecuta una vez al mes

Kubernetes
  ✅ Infraestructura compleja con escalado dinámico
  ❌ Una app con un servidor → Un VPS de 5€ te sobra

DRY a ultranza
  ✅ Lógica de negocio crítica que debe ser consistente
  ❌ Dos componentes parecidos que evolucionarán diferente
```

El problema no es la práctica en sí; es aplicarla sin preguntarse si encaja.

## El Testing Trophy de Kent

Dodds propuso una alternativa a la clásica pirámide de testing. Su *Testing Trophy* prioriza los tests de integración sobre los unitarios:

```markdown
Pirámide tradicional:        Testing Trophy de Kent:

     /  E2E  \                    / E2E \
    / Integr. \                 / Integr. \
   /  Unitarios \              |  Integr.  |
  /_____________\              | Unitarios |
                                \_Static__/
```

```javascript
// ❌ Dogma: "Necesitas tests unitarios para todo"
test('validateEmail returns true for valid email', () => {
  expect(validateEmail('a@b.com')).toBe(true);
});
test('validateEmail returns false for invalid email', () => {
  expect(validateEmail('invalid')).toBe(false);
});
// 20 tests más para cada función pequeña...

// ✅ Pragmatismo: un test de integración cubre más con menos
test('user can register with valid data', async () => {
  render(<RegistrationForm />);

  await userEvent.type(screen.getByLabelText('Email'), 'dev@test.com');
  await userEvent.type(screen.getByLabelText('Password'), 'Str0ng!Pass');
  await userEvent.click(screen.getByRole('button', { name: 'Registrar' }));

  expect(await screen.findByText('Cuenta creada')).toBeInTheDocument();
});
```

El test de integración verifica que el formulario, la validación, el envío y el feedback funcionan juntos. No porque los unitarios sean malos, sino porque **en este contexto** un test de integración da más confianza por menos esfuerzo.

## AHA Programming: evita las abstracciones apresuradas

Dodds creó AHA (*Avoid Hasty Abstractions*) como alternativa al dogma DRY (*Don't Repeat Yourself*):

```javascript
// Tienes dos componentes con código parecido
function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchAdminData().then(setData).finally(() => setLoading(false));
  }, []);
  // ...render admin stuff
}

function UserDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchUserData().then(setData).finally(() => setLoading(false));
  }, []);
  // ...render user stuff
}
```

Un purista DRY crearía inmediatamente un hook `useDashboardData`. Dodds dice: **espera**. ¿Sabes ya si van a evolucionar igual? ¿El admin necesitará polling y el user no? ¿Uno necesitará caché y el otro no? La duplicación es más barata que la abstracción equivocada.

La regla AHA: *prefiere duplicar código a crear la abstracción incorrecta. Cuando veas el patrón real (no el que imaginas), entonces abstrae.*

## La pregunta correcta

Cuando alguien te diga "deberías usar X", no preguntes "¿es una buena práctica?" Pregunta:

1. **¿Para qué tamaño de equipo?** Lo que escala para 200 personas es burocracia para 5
2. **¿Para qué fase del producto?** Un MVP y un producto maduro tienen necesidades opuestas
3. **¿Para qué tipo de cambio?** Lo que protege contra bugs raros puede ralentizar la iteración diaria
4. **¿Cuál es el coste de equivocarse?** En un prototipo, bajo. En software médico, altísimo

Los dogmas son cómodos porque evitan pensar. Pero la ingeniería de software es exactamente eso: tomar decisiones informadas en un contexto específico. No hay atajos universales, no hay balas de plata, no hay "mejores prácticas" que funcionen siempre. Solo hay prácticas que encajan —o no— en tu situación concreta. Como dice Dodds: la mejor práctica es la que tu equipo puede mantener, tu producto necesita, y tu contexto justifica.
