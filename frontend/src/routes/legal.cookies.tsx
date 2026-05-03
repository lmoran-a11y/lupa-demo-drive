import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/legal/cookies")({
  head: () => ({
    meta: [
      { title: "Política de cookies — LUPAUTO" },
      { name: "description", content: "Información sobre el uso de cookies en LUPAUTO." },
    ],
  }),
  component: () => (
    <LegalPage
      title="Política de cookies"
      sections={[
        {
          title: "1. ¿Qué son las cookies?",
          paragraphs: [
            "Las cookies son pequeños archivos de texto que un sitio web almacena en el dispositivo del usuario (ordenador, teléfono móvil o tablet) cuando visita una página web.",
            "Las cookies permiten recordar información sobre la visita del usuario con el fin de facilitar la navegación, mejorar la experiencia del usuario y optimizar el funcionamiento del sitio web.",
          ],
        },
        {
          title: "2. Tipos de cookies utilizadas",
          paragraphs: ["El sitio web de LUPAUTO puede utilizar los siguientes tipos de cookies:"],
          subsections: [
            {
              title: "Cookies técnicas o necesarias",
              paragraphs: [
                "Son aquellas indispensables para el funcionamiento del sitio web y permiten al usuario navegar correctamente por la plataforma.",
                "Estas cookies permiten, por ejemplo:",
              ],
              bullets: [
                "Mantener la sesión del usuario.",
                "Gestionar reservas o solicitudes de servicio.",
                "Garantizar la seguridad del sitio web.",
              ],
            },
            {
              title: "Cookies de análisis",
              paragraphs: [
                "Estas cookies permiten analizar el comportamiento de los usuarios dentro del sitio web con el objetivo de mejorar el funcionamiento de la plataforma.",
                "Permiten conocer, por ejemplo:",
              ],
              bullets: ["Número de visitantes.", "Páginas visitadas.", "Duración de la visita."],
            },
            {
              title: "Cookies de terceros",
              paragraphs: [
                "Este sitio web puede utilizar servicios de terceros que instalan cookies para prestar determinados servicios. Entre ellos pueden encontrarse:",
              ],
              bullets: [
                "Proveedores de pago online (por ejemplo, Stripe).",
                "Herramientas de análisis web.",
                "Servicios tecnológicos necesarios para el funcionamiento de la plataforma.",
              ],
            },
          ],
        },
        {
          title: "3. Gestión de cookies",
          paragraphs: [
            "El usuario puede aceptar, rechazar o configurar el uso de cookies mediante el banner de configuración que aparece al acceder al sitio web.",
            "Además, el usuario puede configurar su navegador para bloquear o eliminar las cookies ya instaladas en su dispositivo.",
            "A continuación se facilitan enlaces con información sobre cómo gestionar cookies en los principales navegadores:",
          ],
          bullets: [
            "Google Chrome — https://support.google.com/chrome/answer/95647",
            "Mozilla Firefox — https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies",
            "Safari — https://support.apple.com/es-es/guide/safari/sfri11471/mac",
            "Microsoft Edge — https://support.microsoft.com/es-es/help/4027947",
          ],
        },
        {
          title: "4. Cambios en la política de cookies",
          paragraphs: [
            "LUPAUTO se reserva el derecho de modificar la presente Política de Cookies con el fin de adaptarla a cambios legislativos o técnicos.",
            "Se recomienda revisar esta política periódicamente para estar informado sobre el uso de cookies en este sitio web.",
          ],
        },
        {
          title: "5. Contacto",
          paragraphs: [
            "Para cualquier duda relacionada con la presente Política de Cookies o el tratamiento de datos personales, puede contactar con nosotros en: lupautospain@gmail.com",
          ],
        },
      ]}
    />
  ),
});
