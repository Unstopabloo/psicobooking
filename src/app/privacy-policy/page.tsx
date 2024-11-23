import { UserButton } from "@clerk/nextjs"
import { SignedIn } from "@clerk/nextjs"
import { SignUpButton } from "@clerk/nextjs"
import { SignedOut } from "@clerk/nextjs"
import { Dialog, DialogTitle, DialogHeader, DialogContent, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Metadata } from "next"
import Image from "next/image"
import isotipo from "../../../public/isotipo.webp";
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Términos y condiciones de Psicobooking",
  description: "Términos y condiciones de uso de la plataforma Psicobooking",
  openGraph: {
    title: "Términos y condiciones de Psicobooking",
    description: "Términos y condiciones de uso de la plataforma Psicobooking",
    type: "website",
    locale: "es_ES",
    url: "https://www.psicobooking.com/tyc",
    siteName: "Psicobooking",
    images: [
      {
        url: "https://www.psicobooking.com/og.png",
        width: 1200,
        height: 630,
      },
    ],
  }
}

type Advice = {
  id: number,
  title: string,
  description: string
}

type Tip = {
  id: number,
  description: string
}

const ADVICES: Advice[] = [
  {
    id: 1,
    title: "Pausa antes de decidir",
    description: "En una crisis, puede parecer que terminar con tu vida es una solución a problemas interminables. Sin embargo, el estrés extremo puede nublar tu mente, afectando tu capacidad para ver soluciones."
  },
  {
    id: 2,
    title: "Habla con alguien",
    description: "Ya sea un amigo, un familiar o un especialista, hablar puede ayudar. El apoyo clínico profesional también es una buena opción. Hay personas dispuestas a escucharte y apoyarte."
  },
  {
    id: 3,
    title: "Mantente seguro/a",
    description: "Evita situaciones o entornos que puedan ser dañinos o llevarte a autolesionarte."
  },
  {
    id: 4,
    title: "Busca compañía",
    description: "Si te sientes solo, considera ir a un lugar público como un café o un parque, o simplemente llama a alguien por teléfono."
  },
  {
    id: 5,
    title: "Evita las drogas",
    description: "Estas pueden agravar la situación y aumentar la probabilidad de actuar de manera impulsiva."
  }
]

const TIPS: Tip[] = [
  {
    id: 1,
    description: "Siempre hay soluciones, el sentirme abrumado hoy no significa que mi problema no tenga solución."
  },
  {
    id: 2,
    description: "No estoy solo, tengo personas que me aman y profesionales a quienes acudir."
  }
  ,
  {
    id: 3,
    description: "Necesito mantener la calma e intentar pensar con claridad."
  },
  {
    id: 4,
    description: "Puedo encontrar nuevas motivaciones y razones para seguir adelante."
  },
  {
    id: 5,
    description: "He superado desafíos antes y, con apoyo y determinación, puedo superar esto."
  },
  {
    id: 6,
    description: "Tomar una decisión así podría causar culpa en quienes me importan."
  },
  {
    id: 7,
    description: "Tengo la capacidad de encontrar soluciones a mis problemas."
  },
  {
    id: 8,
    description: "Creo que las cosas mejorarán con el tiempo y el futuro será más prometedor."
  },
  {
    id: 9,
    description: "Una elección así podría herir a quienes me importan."
  },
  {
    id: 10,
    description: "Reconozco que hay muchas personas que me quieren y desean lo mejor para mí."
  }
]

export default function TycPage() {
  return (
    <div className="flex flex-col relative min-h-screen overflow-x-hidden">
      <header className="w-full fixed top-0 left-0 z-50 bg-gradient-to-b from-card to-card/0 filter backdrop-blur-md animate-fade">
        <div aria-label="contenedor de header" className="container mx-auto flex items-center py-3 justify-between px-4 lg:px-6 xl:px-28 2xl:px-52">
          <Link href="/" className="flex items-center">
            <Image src={isotipo} priority alt="logo" width={70} height={70} />
            <strong className="hidden lg:block font-medium text-lg">PsicoBooking</strong>
          </Link>
          <div className="flex items-center gap-4 md:gap-10">
            <Dialog>
              <DialogTrigger className="group relative text-foreground text-sm hover:text-primary duration-200 font-medium">
                <div className='group-hover:w-full group-hover:opacity-100 duration-300 opacity-50 h-px w-0 bg-primary absolute -bottom-1 left-0'></div>
                Afrontar crisis
              </DialogTrigger>
              <DialogContent className='max-w-3xl bg-card'>
                <DialogHeader>
                  <div className="flex items-center pb-6">
                    <Image src={isotipo} priority alt="logo" width={40} height={40} />
                    <strong className="hidden lg:block font-medium text-base">PsicoBooking</strong>
                  </div>
                  <DialogTitle className='text-balance text-lg text-primary font-semibold'>
                    Siempre hay apoyo, busca ayuda cuando la necesites
                  </DialogTitle>
                  <DialogDescription className='text-foreground/85 font-light'>
                    En momentos de crisis, buscar apoyo es fundamental. Conéctate con un psicólogo de confianza o habla con tus seres queridos. Si no puedes, siempre hay líneas de ayuda disponibles para ti.
                  </DialogDescription>
                </DialogHeader>
                <article className='py-8'>
                  <h3 className='text-primary font-medium pb-4'>Puedes manejar una crisis, con estos consejos:</h3>
                  <ul className='flex flex-col gap-4'>
                    {
                      ADVICES.map(item => (
                        <li key={item.id} className='flex flex-col items-start gap-2 bg-background rounded-xl p-4'>
                          <strong className='w-full font-medium border-b border-border pb-2 mb-1'>{item.title}</strong>
                          <p className='font-light text-foreground/85'>{item.description}</p>
                        </li>
                      ))
                    }
                  </ul>
                </article>
                <article className='py-8'>
                  <h3 className='text-primary font-medium pb-4'>Crea un lugar seguro en tí, prueba con afirmaciones positivas:</h3>
                  <ul className='flex flex-col gap-4'>
                    {
                      TIPS.map(item => (
                        <li key={item.id} className='gap-2 bg-background rounded-xl p-4'>
                          <p className='font-light text-foreground/85'>{item.description}</p>
                        </li>
                      ))
                    }
                  </ul>
                </article>
                <DialogFooter>
                  <strong className='text-center w-full text-balance text-primary font-medium'>Recuerda, cada paso cuenta. No tengas miedo de pedir ayuda, tu bienestar es lo más importante.</strong>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <SignedOut>
              <SignUpButton>
                <Button className="px-1 sm:px-4 py-1 rounded-xl tracking-normal sm:tracking-wider text-sm opacity-90">
                  Registrarse
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>
      <main className="flex flex-col items-center container mx-auto p-4 my-36 max-w-3xl [&>p>strong]:font-semibold [&>ul]:w-full [&>ul]:prose [&>ul]:list-disc [&>ul]:list-inside [&>ul]:mt-4">
        <h1 className="text-2xl text-start w-full p-4 font-bold">Términos y condiciones de Psicobooking</h1>
        <p className="mt-4 prose">
          PSICOBOOKING S.A.C. (en lo sucesivo el «PSICOBOOKING»), con domicilio en Van Gogh 271, apto. 401, San Borja, Lima, Perú, se preocupa por la privacidad de cada persona (el «Usuario» o, en conjunto, los «Usuarios») que acceda, navegue, utilice o se registre en nuestro sitio web (el «Sitio Web»), y específicamente de aquellos Usuarios que proporcionen sus datos personales al suscribirse en nuestro Sitio Web (los «Suscriptores») para adquirir los servicios ofrecidos por diversos profesionales a través del Sitio Web, como también de aquellos profesionales que se registren en el Sitio Web para ofrecer sus servicios a través del mismo (los «Profesionales»).
        </p>
        <p className="mt-4 prose">
          Esta política de privacidad (la «Política de Privacidad») describe los datos que PSICOBOOKING puede recopilar sobre el Usuario y el uso o tratamiento que puede dar a los mismos. También explica las medidas tomadas por PSICOBOOKING para proteger los datos del Usuario, la posibilidad de solicitar el acceso, rectificación, modificación o supresión de su información personal, y a quién podrá contactar en PSICOBOOKING para que sus preguntas en relación con esta Política de Privacidad sean contestadas.
        </p>
        <p className="mt-4 prose">
          <strong>Aceptación de los términos</strong><br />
          La presente Política de Privacidad constituye un acuerdo legal entre el Usuario y PSICOBOOKING, por lo que si el Usuario accede o utiliza el Sitio Web de PSICOBOOKING significa que ha leído, entendido y consentido los términos antes expuestos.
          La presente Política de Privacidad podrá sufrir modificaciones el futuro por lo que PSICOBOOKING se compromete a mantenerlo informado sobre los cambios que puedan realizarse, a través de actualizaciones publicadas directamente en el Sitio Web para cambios o modificaciones significativas, para modificaciones no significativas PSICOBOOKING podrá realizar cambios sin previo aviso al Usuario.
        </p>
        <p className="mt-4 prose">
          Los términos de esta Política de Privacidad serán aplicables ante cualquier Usuario, en lo que sea aplicable y no contravenga las disposiciones de la legislación del Estado donde el Usuario resida.
        </p>

        <p className="mt-4 prose">
          <strong>Definiciones</strong><br />
          Todos los términos aquí presentes que no estén definidos deberán interpretarse de acuerdo a las definiciones adoptadas en la Ley N° 29733 – Ley de Protección de Datos Personales (en adelante, la «Ley de Protección de Datos Personales»).
        </p>
        <p className="mt-4 prose">
          <strong>Ámbito de aplicación</strong><br />
          La presente Política de Privacidad se aplica a todos los Datos Personales de los Usuarios obtenidos como consecuencia de la navegación, utilización o registro en el Sitio Web, así como también a todos los Datos Personales proporcionados por los Suscriptores y Profesionales en ocasión de su registro en el Sitio Web.
        </p>
        <p className="mt-4 prose">
          <strong>Consentimiento</strong><br />
          Al acceder, navegar, utilizar y/o registrarse en el Sitio Web, el Usuario presta su consentimiento libre, expreso e informado a PSICOBOOKING para el Tratamiento de sus Datos Personales y demás actos que resultan de la presente Política de Privacidad. Si el Usuario no está de acuerdo con esta Política de Privacidad deberá abstenerse de utilizar el Sitio Web.
        </p>
        <p className="mt-4 prose">
          <strong>Datos Personales recolectados automáticamente</strong><br />
          Como es usual en muchas páginas web, el servidor del Sitio Web recolecta automáticamente ciertos Datos Personales de los Usuarios del Sitio Web, tales como: dirección del Protocolo Internet (IP) de su computadora, dirección del IP de su Proveedor de servicio de Internet, fecha y hora en que ingresó en el Sitio Web, nombre y versión de su explorador, sistema operativo que está usando, secciones del Sitio Web que el Usuario visitó, páginas leídas e imágenes visualizadas, y cualquier otro contenido que haya enviado o descargado del Sitio Web. Utilizamos esta información con propósitos administrativos o estadísticos y/o para mejorar el servicio que brinda el Sitio Web.
        </p>
        <p className="mt-4 prose w-full">
          En ningún momento PSICOBOOKING recolecta automáticamente Datos Personales del Usuario tales como nombre y apellido, domicilio, teléfono, dirección de domicilio, correo electrónico y números de tarjeta de crédito. Dichos Datos Personales solamente serán recolectados y sometidos a Tratamiento por PSICOBOOKING cuando sean proporcionados por el Usuario de acuerdo a la cláusula n°7.
        </p>
        <p className="mt-4 prose">
          <strong>Cookies</strong><br />
          Las “Cookies” son archivos que contienen una pequeña cantidad de información enviada por el Sitio Web y que es almacenada en el navegador del Usuario, de manera que la Web puede consultar la actividad previa que ha tenido el navegador. PSICOBOOKING utiliza “cookies” en su Sitio Web con la finalidad de mejorar la experiencia del Usuario al guardar sus preferencias, personalizar su experiencia en línea, entre otros aspectos. En ningún caso estos elementos servirán para identificar a una persona concreta, ya que su uso será meramente técnico, para ofrecer un mejor servicio a los Usuarios y permitir la realización de contenidos avanzados.
          El usuario podrá deshabilitar el uso de cookies a través de las opciones de su navegador, si bien PSICOBOOKING no podrá garantizar en este caso el correcto funcionamiento de todos los servicios ofrecidos en el Sitio Web.
        </p>
        <p className="mt-4 prose">
          <strong>Datos Personales proporcionados por el Usuario</strong><br />
          Registro. Para proporcionar una mejor experiencia, se puede solicitar al Usuario a registrarse en el Sitio Web creando para ello una cuenta de usuario. En caso de registrarse, el Usuario acepta y se obliga a (a) suministrar datos exactos, actuales y completos sobre su persona, como se solicita en la forma de registro; y (b) mantener actualizados sus datos en el Sitio Web, de manera que la información permanezca exacta, veraz, actualizada y completa. El Usuario responderá, en cualquier caso, de la veracidad de los datos facilitados, reservándose PSICOBOOKING el derecho de excluir a todo Usuario que haya facilitado datos falsos, sin perjuicio de iniciar las acciones legales que correspondieren.
          Para poder adquirir y/o ofrecer servicios a través del Sitio Web, PSICOBOOKING requiere que el usuario se registre y proporcione una serie de Datos Personales, todo ello en función de los términos y condiciones particulares que le resulten aplicables en su calidad de usuario del Sitio Web. En este sentido, PSICOBOOKING podrá recabar:
        </p>
        <ul className="mt-4 prose">
          <li>Información de carácter personal</li>
          <li>Información profesional</li>
          <li>Información de redes sociales</li>
          <li>Información de localización</li>
          <li>Información bancaria y de facturación</li>
          <li>Información de contacto</li>
        </ul>
        <p className="mt-4 prose">
          PSICOBOOKING únicamente tendrá acceso a la información que el Titular le proporcione de manera personal y directa; a través de medios electrónicos, entre los que se encuentran el correo electrónico, la Plataforma, redes sociales o cualquier otro contacto directo o de manera digital remota existente.
        </p>
        <p className="mt-4 prose">
          <strong>Finalidad</strong><br />
          PSICOBOOKING no solicitará Datos Personales que sean incompatibles con la finalidad del Sitio Web.
          Aquellos Datos Personales que sean requeridos expresamente al momento de crear una cuenta de usuario serán utilizados con la finalidad de:
        </p>
        <ul className="mt-4 prose">
          <li>Incorporarlos en los instrumentos jurídicos que se requieran para la formalización de los servicios profesionales contratados</li>
          <li>Prevención, diagnóstico y tratamientos psicológicos</li>
          <li>Utilizarlos en cualquier tipo de acto o diligencia de cobranza judicial y/o extrajudicial</li>
          <li>Elaborar estadísticas y reportes de los datos que se otorguen por el Responsable y servicios conexos con el objeto de llevar un control de dichos servicios, así como para dar seguimiento puntual de los mismos</li>
          <li>Prevenir y/o reportar la comisión de delitos, ilícitos o irregularidades relacionados con los servicios contratados</li>
          <li>Dar cumplimiento a las obligaciones contractuales que sean adquiridas</li>
          <li>Administrar y operar los servicios que solicita o contrata con el Responsable</li>
          <li>Evaluar si el Titular cuenta con las capacidades, conocimientos, destreza, entrenamiento, formación y títulos profesionales suficientes para incorporarse como prestador de servicios profesionales del Responsable</li>
          <li>Reportar la comisión de delitos, ilícitos o irregularidades relacionados con los servicios brindados por los prestadores de servicio</li>
          <li>Mejorar el contenido del Sitio Web, permitir que los Suscriptores puedan gozar de una mejor disponibilidad y acceso a los servicios que se comercializan a través del Sitio Web y personalizar el Sitio Web de acuerdo con las preferencias del Usuario</li>
          <li>Comunicarle información con fines publicitarios, de comercialización e investigación</li>
        </ul>

        <p className="mt-4 prose">
          <strong>Datos Sensibles</strong><br />
          Además de los Datos Personales mencionados anteriormente, PSICOBOOKING podría solicitar, recabar, tratar y/o utilizar los siguientes datos personales considerados como sensibles, que requieren de especial protección:
        </p>
        <ul className="mt-4 prose w-full">
          <li>Datos de salud: Información concerniente a una persona física relacionada con la valoración, preservación, cuidado, mejoramiento y recuperación de su estado de salud físico o mental, presente, pasado o futuro, así como información genética.</li>
          <li>Datos ideológicos: Información sobre las posturas ideológicas, religiosas, filosóficas o morales de una persona.</li>
          <li>Datos sobre vida sexual: Información de una persona física relacionada con su comportamiento, preferencias sexuales, prácticas o hábitos sexuales, parejas, y actividad sexual.</li>
        </ul>

        <p className="mt-4 prose">
          <strong>Confidencialidad y cesión de Datos Personales</strong><br />
          Los Datos Personales recolectados son de carácter totalmente confidencial y PSICOBOOKING tomará las medidas de seguridad para evitar su uso desautorizado. En este sentido, PSICOBOOKING no divulgará los Datos Personales acerca de los Usuarios, Suscriptores o Profesionales, excepto en los casos que se describen a continuación, previo procedimiento de disociación:
        </p>
        <p className="mt-4 prose">
          PSICOBOOKING puede divulgar su información personal a otras entidades controlantes o controladas, subsidiarias o afiliadas. Al hacerlo, esas otras entidades utilizarán su información de una manera que sea coherente con los objetivos para los cuales se recolectaron los Datos Personales y para los cuales el Usuario otorgó su consentimiento.
        </p>
        <p className="mt-4 prose">
          PSICOBOOKING también puede compartir los Datos Personales de los Usuarios con terceros que sean contratados para que presten servicios de apoyo. Dichos terceros tienen la obligación de utilizar los Datos Personales de los Usuarios solamente para prestar servicios en nuestro nombre y tratar sus Datos Personales de manera estrictamente confidencial.
        </p>
        <p className="mt-4 prose">
          PSICOBOOKING puede comunicar los Datos Personales de los Suscriptores a los Profesionales que comercialicen sus Servicios a través del Sitio Web, siempre bajo un criterio de confidencialidad.
        </p>
        <p className="mt-4 prose">
          En ciertas circunstancias limitadas, PSICOBOOKING podrá compartir o transferir Datos Personales a terceros que no estén relacionados. Por ejemplo:
        </p>
        <ul className="mt-4 prose">
          <li>Si usted lo solicita</li>
          <li>Para cumplir con una obligación legal o un requerimiento de alguna entidad estatal o de un tribunal</li>
          <li>Para investigar un posible delito, como el robo de identidad</li>
          <li>Si está relacionado con la venta, la compra, la fusión, la reorganización, la liquidación o la disolución de PSICOBOOKING o de una unidad comercial de PSICOBOOKING</li>
          <li>Si la información es de conocimiento público.</li>
        </ul>
        <p className="mt-4 prose">
          <strong>Archivo de Datos</strong><br />
          PSICOBOOKING conservará sus Datos Personales por el término necesario para el cumplimiento de las finalidades descriptas en la presente Política de Privacidad. Los Datos Personales que se recaben del Usuario serán destruidos cuando hayan dejado de ser necesarios o pertinentes a los fines para los cuales hubiesen sido recolectados, salvo que exista una obligación legal de conservarlos por un término mayor, o en ocasión del ejercicio de los derechos ARCO (conforme se definen más adelante) por parte del Usuario.
        </p>
        <p className="mt-4 prose">
          <strong>Derechos ARCO del Titular de los Datos</strong><br />
          De conformidad con la Ley de Protección de Datos Personales, el Titular goza de los siguientes derechos en relación con sus Datos Personales (en lo sucesivo “Derechos ARCO”):
        </p>
        <ul className="mt-4 prose">
          <li>Derecho al Acceso a sus Datos Personales.</li>
          <li>Derecho a solicitar su Rectificación o supresión.</li>
          <li>Derecho a la Cancelación de su tratamiento.</li>
          <li>Derecho a Oponerse al tratamiento de los datos.</li>
          <li>Derecho a solicitar la limitación del tratamiento de los datos.</li>
          <li>Derecho a la portabilidad de sus Datos Personales.</li>
          <li>Derecho a presentar una reclamación ante una autoridad de control.</li>
        </ul>
        <p className="mt-4 prose">
          El Titular tiene derecho de acceder, rectificar y cancelar sus Datos Personales, así como de oponerse al tratamiento de los mismos o revocar el consentimiento que para tal fin nos haya otorgado, a través del siguiente procedimiento. Si el Titular ha otorgado su consentimiento para alguna finalidad concreta, tiene derecho a retirar el consentimiento otorgado en cualquier momento, sin que ello afecte la licitud del tratamiento basado en el consentimiento previo a su retirada.
        </p>
        <p className="mt-4 prose">
          <strong>Procedimiento para el ejercicio de los derechos ARCO</strong><br />
          El Titular deberá dirigir un escrito libre a PSICOBOOKING en los siguientes datos de contacto:
        </p>
        <ul className="mt-4 prose">
          <li>Domicilio: Van Gogh 271, apto. 401, San Borja, Lima, Perú</li>
          <li>Correo electrónico: datospersonales@psicobooking.com</li>
          <li>Área: Unidad de Protección de Datos Personales</li>
        </ul>
        <p className="mt-4 prose w-full">
          El Titular deberá acompañar a su solicitud lo siguiente:
        </p>
        <ul className="mt-4 prose">
          <li>El nombre completo del Titular y correo electrónico o medio de contacto para comunicar la respuesta a la solicitud.</li>
          <li>Copia simple de los documentos que acrediten su identidad o, en su caso, carta poder o documento que acredite la representación legal del Titular.</li>
          <li>La descripción clara y precisa de los Datos Personales del Titular respecto de los derechos que se desean ejercer.</li>
          <li>La respuesta a la solicitud del Titular se realizará a través del correo electrónico o medio de contacto señalado por el Titular al momento de realizar su solicitud.</li>
        </ul>
        <p className="mt-4 prose">
          En el caso de solicitudes de rectificación de Datos Personales, el Titular deberá indicar en la solicitud, además de lo arriba señalado, las modificaciones a realizarse y aportar la documentación que sustente la petición.
        </p>
        <p className="mt-4 prose">
          PSICOBOOKING responderá toda solicitud en un plazo máximo de 30 (treinta) días hábiles contados desde la fecha de presentación de la solicitud correspondiente, a efecto de que, si resulta procedente, se haga efectiva la misma dentro de los 15 (quince) días hábiles siguientes a la fecha en que se comunique la respuesta. Los plazos antes referidos podrán ser ampliados una sola vez por un periodo igual, siempre y cuando así lo justifiquen las circunstancias del caso.
        </p>
        <p className="mt-4 prose">
          Si el Titular considera que han sido vulnerados sus derechos respecto de la protección de Datos Personales, tiene el derecho de acudir a la autoridad correspondiente para defender su ejercicio. La autoridad es el Autoridad Nacional de Transparencia y Acceso a la Información Pública, su sitio web es: https://www.gob.pe/antaip
        </p>
      </main>
    </div >
  )
}