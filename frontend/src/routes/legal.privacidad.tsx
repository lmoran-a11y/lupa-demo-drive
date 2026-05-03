import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/legal/privacidad")({
  head: () => ({
    meta: [
      { title: "Política de privacidad — LUPAUTO" },
      { name: "description", content: "Política de privacidad y tratamiento de datos personales en LUPAUTO." },
    ],
  }),
  component: () => (
    <LegalPage
      title="Política de privacidad"
      sections={[
        {
          title: "1. Responsable del tratamiento",
          paragraphs: [
            "De conformidad con el Reglamento (UE) 2016/679 (RGPD) y la normativa española vigente en materia de protección de datos, se informa a los usuarios de que los datos personales recogidos a través del presente sitio web serán tratados por:",
            "Titular: Francisco Jesús Jiménez Ramírez",
            "NIF: 26823473E",
            "Nombre comercial: LUPAUTO",
            "Correo electrónico: lupautospain@gmail.com",
            "Ubicación: España",
          ],
        },
        {
          title: "2. Finalidad del tratamiento de los datos",
          paragraphs: [
            "Los datos personales que los usuarios faciliten a través del sitio web podrán ser utilizados para las siguientes finalidades:",
          ],
          bullets: [
            "Gestionar el registro de usuarios en la plataforma.",
            "Permitir la solicitud y gestión de inspecciones de vehículos.",
            "Facilitar la comunicación entre clientes y talleres colaboradores cuando sea necesario para la prestación del servicio.",
            "Gestionar pagos y transacciones realizadas a través de la plataforma.",
            "Enviar comunicaciones relacionadas con el servicio contratado.",
            "Mejorar el funcionamiento y seguridad de la plataforma.",
          ],
        },
        {
          title: "3. Datos que podemos recopilar",
          paragraphs: ["Dependiendo del uso de la plataforma, podremos recopilar los siguientes datos:"],
          subsections: [
            {
              title: "Datos identificativos",
              bullets: ["Nombre y apellidos", "Correo electrónico", "Teléfono de contacto"],
            },
            {
              title: "Datos relacionados con el servicio",
              bullets: [
                "Matrícula del vehículo",
                "Información del vehículo inspeccionado",
                "Ubicación aproximada del vehículo",
                "Fotografías o vídeos del vehículo aportados en el informe de inspección",
              ],
            },
            {
              title: "Datos de pago",
              paragraphs: [
                "Los pagos realizados en la plataforma se gestionan mediante proveedores de pago externos (por ejemplo, Stripe), por lo que LUPAUTO no almacena directamente los datos completos de tarjetas bancarias.",
              ],
            },
          ],
        },
        {
          title: "4. Base legal para el tratamiento",
          paragraphs: ["El tratamiento de los datos personales se basa en:"],
          bullets: [
            "La ejecución del contrato o servicio solicitado por el usuario.",
            "El consentimiento del usuario al aceptar la presente política de privacidad.",
            "El cumplimiento de obligaciones legales aplicables.",
          ],
        },
        {
          title: "5. Cesión de datos a terceros",
          paragraphs: [
            "Para poder prestar el servicio solicitado, algunos datos podrán ser comunicados a terceros estrictamente necesarios para la prestación del servicio, como:",
          ],
          bullets: [
            "Talleres mecánicos colaboradores encargados de realizar la inspección.",
            "Proveedores de servicios tecnológicos o de pago utilizados por la plataforma.",
          ],
        },
        {
          title: "6. Conservación de los datos",
          paragraphs: [
            "Los datos personales se conservarán durante el tiempo necesario para prestar el servicio solicitado y cumplir con las obligaciones legales correspondientes.",
            "Una vez finalizada la relación con el usuario, los datos podrán conservarse durante los plazos legalmente establecidos antes de su eliminación definitiva.",
          ],
        },
        {
          title: "7. Derechos del usuario",
          paragraphs: ["Los usuarios tienen derecho a:"],
          bullets: [
            "Acceder a sus datos personales.",
            "Solicitar la rectificación de datos incorrectos.",
            "Solicitar la eliminación de sus datos cuando ya no sean necesarios.",
            "Solicitar la limitación del tratamiento de sus datos.",
            "Oponerse al tratamiento de sus datos.",
            "Solicitar la portabilidad de sus datos.",
          ],
          subsections: [
            {
              title: "",
              paragraphs: [
                "Para ejercer estos derechos, el usuario puede enviar una solicitud junto con una copia de su documento de identidad al correo electrónico: lupautospain@gmail.com",
              ],
            },
          ],
        },
        {
          title: "8. Seguridad de los datos",
          paragraphs: [
            "LUPAUTO adopta las medidas técnicas y organizativas necesarias para garantizar la seguridad de los datos personales y evitar su pérdida, alteración, acceso no autorizado o uso indebido.",
          ],
        },
        {
          title: "9. Modificaciones de la política de privacidad",
          paragraphs: [
            "LUPAUTO se reserva el derecho a modificar la presente Política de Privacidad para adaptarla a novedades legislativas o cambios en el funcionamiento de la plataforma.",
          ],
        },
        {
          title: "10. Autoridad de control",
          paragraphs: [
            "Si un usuario considera que sus derechos en materia de protección de datos han sido vulnerados, puede presentar una reclamación ante la autoridad competente:",
            "Agencia Española de Protección de Datos (AEPD) — https://www.aepd.es",
          ],
        },
      ]}
    />
  ),
});
