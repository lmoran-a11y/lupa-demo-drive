import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute()({
  head: () => ({
    meta: [
      { title: "Términos y condiciones — LUPAUTO" },
      { name: "description", content: "Términos y condiciones de uso de la plataforma LUPAUTO." },
    ],
  }),
  component: () => (
    <LegalPage
      title="Términos y condiciones de uso"
      sections={[
        {
          title: "1. Objeto",
          paragraphs: [
            "Los presentes Términos y Condiciones regulan el acceso y uso de la plataforma LUPAUTO, que actúa como intermediario tecnológico entre usuarios que desean inspeccionar un vehículo antes de su compra y talleres mecánicos colaboradores que prestan dicho servicio.",
            "El acceso y uso de la plataforma implica la aceptación plena de las presentes condiciones.",
          ],
        },
        {
          title: "2. Naturaleza del servicio",
          paragraphs: [
            "LUPAUTO actúa exclusivamente como intermediario tecnológico entre el cliente y los talleres mecánicos colaboradores.",
            "LUPAUTO no realiza inspecciones mecánicas ni interviene directamente en el diagnóstico del vehículo.",
            "Las inspecciones son realizadas por talleres independientes que actúan bajo su propia responsabilidad profesional.",
          ],
        },
        {
          title: "3. Funcionamiento de la plataforma",
          paragraphs: ["El servicio funciona de la siguiente forma:"],
          bullets: [
            "El cliente solicita una inspección del vehículo a través de la plataforma.",
            "El cliente realiza el pago del servicio mediante los métodos de pago disponibles.",
            "Se reserva una cita con un taller colaborador.",
            "El taller realiza la inspección del vehículo.",
            "El cliente recibe un informe con los resultados de la inspección.",
          ],
        },
        {
          title: "4. Confirmación del vendedor",
          paragraphs: [
            "Antes de realizar una reserva, el cliente debe confirmar con el vendedor del vehículo que acepta la realización de una inspección mecánica.",
            "LUPAUTO no se responsabiliza de situaciones en las que el vendedor del vehículo no permita realizar la inspección o no comparezca a la cita.",
          ],
        },
        {
          title: "5. Responsabilidad del taller",
          paragraphs: [
            "Los talleres colaboradores actúan como profesionales independientes y son responsables de la inspección realizada y del contenido del informe emitido.",
            "El informe tiene carácter informativo y orientativo, y no constituye una garantía sobre el estado actual o futuro del vehículo inspeccionado.",
          ],
        },
        {
          title: "6. Pagos",
          paragraphs: [
            "El pago del servicio se realiza a través de la plataforma mediante proveedores de pago externos.",
            "LUPAUTO percibe una comisión por la intermediación en la prestación del servicio.",
            "Los importes correspondientes a los talleres colaboradores serán gestionados por la plataforma conforme a las condiciones acordadas con dichos talleres.",
          ],
        },
        {
          title: "7. Cancelaciones",
          paragraphs: [
            "Las cancelaciones realizadas con más de 24 horas de antelación respecto a la cita programada podrán optar a una devolución parcial del importe abonado, descontando los gastos de gestión y reserva del servicio.",
            "Las cancelaciones realizadas con menos de 24 horas de antelación no serán reembolsables, salvo en casos de fuerza mayor debidamente justificados.",
          ],
        },
        {
          title: "8. Vendedor no comparece o no permite la inspección",
          paragraphs: [
            "En caso de que el vendedor del vehículo no comparezca a la cita o no permita realizar la inspección, el cliente podrá optar por:",
          ],
          bullets: [
            "Solicitar una reprogramación gratuita de la inspección una única vez, que deberá realizarse dentro de un plazo máximo de 7 días desde la cita original.",
            "Solicitar una devolución parcial del importe abonado, aplicándose una tarifa de reserva destinada a compensar al taller por la cita reservada, así como los gastos de gestión.",
          ],
        },
        {
          title: "9. Tiempo de espera",
          paragraphs: [
            "El taller colaborador esperará un máximo de 15 minutos desde la hora programada de la cita.",
            "Transcurrido dicho tiempo sin que la inspección pueda realizarse, la cita podrá considerarse fallida.",
          ],
        },
        {
          title: "10. Limitación de responsabilidad",
          paragraphs: ["LUPAUTO no será responsable de:"],
          bullets: [
            "La decisión de compra o no compra del vehículo por parte del cliente.",
            "Defectos ocultos o problemas mecánicos no detectados durante la inspección.",
            "La exactitud del diagnóstico realizado por el taller colaborador.",
          ],
        },
        {
          title: "11. Uso correcto de la plataforma",
          paragraphs: [
            "Los usuarios se comprometen a utilizar la plataforma de forma lícita y conforme a las presentes condiciones.",
            "Queda prohibido utilizar la plataforma para fines fraudulentos o que puedan perjudicar a otros usuarios o a la propia plataforma.",
          ],
        },
        {
          title: "12. Modificación de las condiciones",
          paragraphs: [
            "LUPAUTO se reserva el derecho de modificar en cualquier momento los presentes Términos y Condiciones con el fin de adaptarlos a cambios en el funcionamiento del servicio o a la normativa vigente.",
          ],
        },
        {
          title: "13. Legislación aplicable",
          paragraphs: [
            "Las presentes condiciones se regirán por la legislación española.",
            "Cualquier controversia derivada del uso de la plataforma se someterá a los juzgados y tribunales competentes conforme a la normativa aplicable.",
          ],
        },
      ]}
    />
  ),
});
