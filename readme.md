# Arquitectura Hexagonal (Puertos y Adaptadores)

## Promueve
1. Que el código sea
- Mantenible
- Escalable
- Testeable
## Qué hace?
- Separa nuestras reglas de negocio (Domain) de nuestra estructura

## Se divide en:
1. Infraestructure:

    Interactúa con componentes externos al dominio de la aplicación, DBs, APIs externas, librerías (express, swagger, etc), entre otros.
    Este conoce las otras 2 capas.

2. Application:

    En esta parte van los casos de uso como, crear producto, eliminar producto, buscar productos, buscar un producto, actualizar un producto, etc.
    Este es no conoce la capa de infraestructure pero si la de dominio.

3. Domain:

    El dominio es el núcleo de la app. En este residen las reglas de negocio, entidades y lógica que define el comportamiento de la app. En este vienen las interfaces, clases, DTOs, etc.
    Este es no conoce la capa de application ni la de infraestructure.

# Vertical slicing
Es la manera en la que se organizan las carpetas.

- Entity
   - Domain
   - Infraestructure
   - Application

## Para utilizar prisma

1. Instalar
```bash
npm install prisma --save-dev
```
2. Configurar DB de prueba "sqlite"
```bash
npx prisma init --datasource-provider sqlite
```
3. Crear entidades
```prisma
model Order {
  orderId   Int   @id @default(autoincrement())
  total     Int
  productId Int
  createdAt DateTime
  @@map("orders")
}
```
4. Correr migración
```bash
npx prisma migrate dev --name init
```