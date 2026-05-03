import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute()({
  head: () => ({
    meta: [
      { title: "Aviso legal — LUPAUTO" },
      { name: "description", content: "Información legal y titularidad del sitio web LUPAUTO." },
    ],
  }),
  component: () => (
    <LegalPage
      title="Aviso legal"
      intro="En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se facilita la siguiente información sobre el titular de este sitio web."
      sections={[
        {
          title: "1. Datos del titular",
          paragraphs: [
            "Titular: Francisco Jesús Jiménez Ramírez",
            "NIF: 26823473E",
            "Nombre comercial: LUPAUTO",
            "Correo electrónico: lupautospain@gmail.com",
            "Ubicación: España",
          ],
        },
        {
          title: "2. Objeto",
          paragraphs: [
            "El presente aviso legal regula el uso del sitio web de LUPAUTO, una plataforma tecnológica que actúa como intermediario entre usuarios que desean inspeccionar un vehículo antes de su compra y talleres mecánicos colaboradores que prestan dicho servicio.",
            "El acceso al sitio web atribuye la condición de usuario e implica la aceptación plena de las condiciones recogidas en el presente aviso legal, así como en los demás textos legales publicados.",
          ],
        },
        {
          title: "3. Propiedad intelectual e industrial",
          paragraphs: [
            "Todos los contenidos del sitio web (textos, imágenes, logotipos, diseño, código y marca LUPAUTO) son titularidad del responsable o cuentan con la correspondiente autorización para su uso.",
            "Queda prohibida su reproducción, distribución o transformación sin autorización expresa del titular.",
          ],
        },
        {
          title: "4. Responsabilidad",
          paragraphs: [
            "LUPAUTO no se hace responsable del uso indebido del sitio web por parte de los usuarios, ni de los daños que pudieran derivarse del mismo.",
            "El titular se reserva el derecho a modificar, suspender o interrumpir el acceso al sitio web sin previo aviso.",
          ],
        },
        {
          title: "5. Legislación aplicable",
          paragraphs: [
            "El presente aviso legal se rige por la legislación española. Cualquier controversia relacionada con el uso del sitio web se someterá a los juzgados y tribunales competentes conforme a la normativa vigente.",
          ],
        },
      ]}
    />
  ),
});
