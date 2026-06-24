# Cotizador de Placas de Acero (Progressive Web App)

Aplicación web móvil optimizada para el cálculo, cubicación y presupuestado de múltiples placas de acero en función de sus dimensiones físicas y espesores comerciales en pulgadas. El sistema calcula de manera automática el peso estimado, subtotal, IVA y costos totales desglosados.

Este desarrollo fue diseñado bajo el enfoque "Offline-First", lo que garantiza un funcionamiento óptimo en entornos con baja o nula conectividad a internet a través de la implementación de Service Workers.

## Características Técnicas y Funcionales

* **Sistema de Cotización Múltiple:** Permite la gestión y acumulación de diferentes partidas con especificaciones variables en una misma nota.
* **Interfaz Adaptada en Centímetros:** Entrada de datos configurada en valores enteros para agilizar las mediciones directas en el área de trabajo.
* **Cálculo de Peso Real Homologado:** Algoritmo matemático calibrado mediante un factor de conversión exacto, tomando como estándar que una placa de 1.22 x 3.05 metros de 1 pulgada de espesor equivale a 750 kg.
* **Procesamiento de Costos Comerciales:** Desglose automatizado de Subtotal, IVA del 16% y redondeo final del importe total para su cobro.
* **Módulo de Exportación Visual:** Renderizado local de la nota de cotización en formato de imagen PNG mediante la integración de la librería html2canvas, facilitando su distribución directa.
* **Persistencia Local (Modo Offline):** Cacheado completo del código fuente y librerías externas que permite ejecutar la aplicación, procesar cotizaciones y descargar los comprobantes sin requerir transferencia de datos activa.

## Arquitectura y Tecnologías Utilizadas

* **Estructura e Interfaz:** HTML5 y CSS3 con diseño adaptativo enfocado a dispositivos móviles.
* **Lógica de Negocio:** JavaScript (Vanilla) encargado del procesamiento aritmético local y la manipulación dinámica del DOM.
* **Estrategia de Almacenamiento:** Service Workers configurados para la gestión dinámica de caché e interceptación de peticiones de red.
* **Dependencias Externas:** Librería html2canvas embebida para la conversión asíncrona de nodos del DOM a mapas de bits.

## Despliegue e Instalación local

Para clonar y ejecutar el proyecto en un entorno de desarrollo o producción local:

1. Clonar el repositorio:
   ```bash
   git clone [https://github.com/tu-usuario/tu-repositorio.git](https://github.com/tu-usuario/tu-repositorio.git)