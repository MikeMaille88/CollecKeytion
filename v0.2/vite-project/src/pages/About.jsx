function About() {
  return (
    <div className="bg-slate-700 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-center text-gray-200 mb-8 border-b border-gray-600 pb-4">
          Mentions Légales
        </h1>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-200 mb-3">Édition du site</h2>
          <p className="text-gray-200">
            Le présent site, accessible à l&apos;URL <a href="https://colleckeytion.vercel.app" className="text-teal-300 hover:text-teal-600 hover:underline">https://colleckeytion.vercel.app</a> (le « Site »), 
            est édité par :
          </p>
          <p className="text-gray-200 mt-2">
            Mickael BOHRER, résidant au 8 allée des Cerisiers, 92100 BOULOGNE-BILLANCOURT.
          </p>
          <p className="text-gray-200 mt-2">
            Le Responsable de la publication du Site est Mickael BOHRER.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-200 mb-3">Hébergement du site</h2>
          <p className="text-gray-200">
            Le Site est hébergé par la société :
          </p>
          <address className="text-gray-200 not-italic mt-2">
            Vercel Inc.<br />
            440 N Barranca Avenue #4133<br />
            Covina, CA 91723<br />
            United States<br />
            +1 559-288-7060
          </address>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-200 mb-3">Propriété intellectuelle et contrefaçons</h2>
          <p className="text-gray-200">
            Mickael BOHRER est propriétaire des droits de propriété intellectuelle et 
            détient les droits d&apos;usage sur tous les éléments accessibles sur le site internet, notamment les textes, images, graphismes, logos et icônes. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Mickael BOHRER.
          </p>
          <p className="text-gray-200 mt-2">
            Toute exploitation non autorisée du site ou de l&apos;un quelconque des éléments 
            qu&apos;il contient sera considérée comme constitutive d&apos;une contrefaçon et 
            poursuivie conformément aux dispositions des articles L.335-2 et suivants du 
            Code de Propriété Intellectuelle.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-200 mb-3">Nous contacter</h2>
          <ul className="text-gray-200 list-disc pl-5">
            <li>Par téléphone : <a href="tel:+33612345678" className="text-teal-300 hover:text-teal-600 hover:underline">+336 12 34 56 78</a></li>
            <li>Par email : <a href="mailto:g.aybram.festivo@gmail.com" className="text-teal-300 hover:text-teal-600 hover:underline">m.bohrer.colleckeytion@gmail.com</a></li>
            <li>Par courrier : 8 allée des Cerisiers, 92100 BOULOGNE-BILLANCOURT</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-200 mb-3">Données personnelles</h2>
          <p className="text-gray-200">
            Conformément au Règlement Général sur la Protection des Données 2016/679 
            du 27 avril 2016 («RGPD»), l&apos;utilisateur du site <a href="https://colleckeytion.vercel.app" className="text-teal-300 hover:text-teal-600 hover:underline">https://colleckeytion.vercel.app </a> dispose d&apos;un droit d&apos;accès, de modification et de suppression des informations 
            collectées.
          </p>
          <p className="text-gray-200 mt-2">
            Pour plus d&apos;informations sur la façon dont nous traitons vos données (type de 
            données, finalité, destinataire...), lisez notre <a href="/privacy-policy" className="text-teal-300 hover:text-teal-600 hover:underline">Politique de confidentialité</a>.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-200 mb-3">Droit applicable et attribution de juridiction</h2>
          <p className="text-gray-200">
            Tout litige en relation avec l&apos;utilisation du site <a href="https://colleckeytion.vercel.app" className="text-teal-300 hover:text-teal-600 hover:underline">https://colleckeytion.vercel.app </a> est soumis au droit français. En dehors des cas où la loi ne le permet pas, il est fait attribution exclusive de juridiction aux tribunaux compétents de NANTERRE.
          </p>
        </section>
        
        <div className="text-center mt-8 text-sm text-gray-400">
          <p>Dernière mise à jour : {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default About;
