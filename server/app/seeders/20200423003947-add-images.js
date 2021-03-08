module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => queryInterface
    .bulkInsert('images', [
      {
        id: 1,
        name: 'Dauphin',
        path: 'https://www.albawaba.com/sites/default/files/styles/de2e_standard/public/2019-12/shutterstock_1068728774.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Lapin',
        path: 'https://argos-veterinaire.com/wp-content/uploads/2017/04/Fiche-pratique-lapin-v%C3%A9t%C3%A9rinaire-Bordeaux.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Ornithorynque',
        path: 'https://static.nationalgeographic.fr/files/styles/image_1900/public/01-platypus-decline-20180430_3dg1547.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Requin',
        path: 'https://img.huffingtonpost.com/asset/5cb9a7cb1f0000c6007f2015.jpeg?cache=DWPxGV1Det&ops=1200_630',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'Dents',
        path: 'https://dr-pourtier-breuil-solene.chirurgiens-dentistes.fr/wp-content/uploads/2018/05/blanchir-dent-apres-min.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        name: 'Branchies',
        path: 'https://i.imgur.com/TzQu2mJ.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        name: 'Pattes',
        path: 'https://4.bp.blogspot.com/-XjAKq2vy8Ds/UCJaRjMi3dI/AAAAAAAAAHQ/NR0MDZZZrPY/s640/hd-dog-wallpaper-with-a-dog-on-his-back-on-the-grass-hd-dogs-wallpapers-backgrounds.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        name: 'Allaitement',
        path: 'https://www.woopets.fr/assets/img/005/361/og-image/alimenter-chatte-allaitement.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        name: 'Lamantin',
        path: 'https://www.parczoologiquedeparis.fr/sites/parczoologiquedeparis/files/thumbnails/image/fg4_1685_c_f-g_grandin_mnhn.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        name: 'Baleine',
        path: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Humpback_whales_in_singing_position.jpg/1200px-Humpback_whales_in_singing_position.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        name: 'Chèvre',
        path: 'https://jardinage.lemonde.fr/images/dossiers/2018-01/chevre-1-074448.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        name: 'Lion',
        path: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Cecil_the_lion_at_Hwange_National_Park_%284516560206%29.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        name: 'Orque',
        path: 'https://img.over-blog-kiwi.com/0/85/92/01/20150326/ob_b264b8_01-orque.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        name: 'Otarie',
        path: 'https://www.anigaido.com/media/zoo_animaux/101-200/200/otarie-de-californie-1-thomas-pierre-xl.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        name: 'Lionne',
        path: 'https://cdn.pixabay.com/photo/2019/08/18/05/31/lion-4413424_960_720.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 16,
        name: 'Lionnes',
        path: 'https://amazon.clikpic.com/michelbury/images/Lionne_profil_en_alerte_avec_2e_lionne.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 17,
        name: 'Lionceau',
        path: 'https://www.imagesdoc.com/wp-content/uploads/sites/33/2018/10/Lionceaux-F-G-Grandin.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 18,
        name: 'Cochon d\'inde',
        path: 'https://static.wamiz.fr/images/upload/shutterstock_413075476.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 19,
        name: 'Écureuil',
        path: 'https://france3-regions.francetvinfo.fr/hauts-de-france/sites/regions_france3/files/styles/top_big/public/assets/images/2019/03/19/maxstockfr039720-4145190.jpg?itok=wTMjs7hw',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 20,
        name: 'Rat',
        path: 'https://resize-parismatch.lanmedia.fr/img/var/news/storage/images/paris-match/actu/societe/invasion-de-rats-a-paris-la-video-effrayante-d-un-eboueur-1444106/23757785-1-fre-FR/Invasion-de-rats-a-Paris-la-video-effrayante-d-un-eboueur.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 21,
        name: 'Tigre',
        path: 'https://www.zoorigin.com/media/images/focus-le-tigre-entre-terreur-et-respect.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 22,
        name: 'Léopard',
        path: 'https://cdn.futura-sciences.com/buildsv6/images/wide1920/8/3/9/839787a428_123678_01-intro-180.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 23,
        name: 'Guépard',
        path: 'https://resize-parismatch.lanmedia.fr/img/var/news/storage/images/paris-match/actu/faits-divers/l-hypothese-du-guepard-651810/6460132-1-fre-FR/L-hypothese-du-guepard.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 24,
        name: 'Jaguar',
        path: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Jaguar_full.jpg/1200px-Jaguar_full.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 25,
        name: 'Éléphant',
        path: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Afrikanische_Elefant%2C_Miami2.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 26,
        name: 'Hippopotame',
        path: 'http://test.zoopontscorff.fr/scolaire/wp-content/uploads/sites/3/2019/04/OlivierTHOMAS-89.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 27,
        name: 'Girafe',
        path: 'https://cdn.futura-sciences.com/buildsv6/images/wide1920/c/3/f/c3fd7907dc_98829_girafe-definition.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 28,
        name: 'Veau',
        path: 'https://siena.rosselcdn.net/sites/default/files/dpistyles_v2/ena_16_9_extra_big/2019/09/23/node_441928/1610650/public/2019/09/23/B9721005842Z.1_20190923181128_000%2BGHMEHBPDA.1-0.jpg?itok=zjpS0PZY1569320719',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 29,
        name: 'Renard',
        path: 'https://master.salamandre.net/media/21704/renard-1-1800x1195.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 30,
        name: 'Chien',
        path: 'https://lvdneng.rosselcdn.net/sites/default/files/dpistyles_v2/ena_16_9_extra_big/2020/02/28/node_717014/45536711/public/2020/02/28/B9722743626Z.1_20200228110626_000%2BGMAFK84GO.1-0.jpg?itok=0Zxrzx2C1582889191',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 31,
        name: 'Loup',
        path: 'https://www.vie-publique.fr/sites/default/files/en_bref/image_principale/loup.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 32,
        name: 'Koala',
        path: 'https://cdn.futura-sciences.com/buildsv6/images/largeoriginal/e/2/9/e291fd71c5_50150206_koala-espece-danger.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 33,
        name: 'Dauphin rose',
        path: 'https://pm1.narvii.com/7059/151483518559d9db6ba2de9150080a000747269dr1-1080-740v2_uhq.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 34,
        name: 'Rhinocéros blanc',
        path: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Rhinoc%C3%A9ros_blanc_JHE.jpg/1200px-Rhinoc%C3%A9ros_blanc_JHE.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 35,
        name: 'Chat gris',
        path: 'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=%5B1140%2C359%5D&w=2000&h=1047&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F12%2F2020%2F04%2F08%2Fpet-cat-GettyImages-1166533826-2000.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 36,
        name: 'Dauphin saut',
        path: 'https://www.aquaportail.com/pictures1404/mammifere-grand-dauphin.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 37,
        name: 'Oiseau bleu',
        path: 'https://www.notretemps.com/cache/com_zoo_images/84/oiseaux-applis3_0a1675dfdc3c7bed879a432a7294fe8d.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 38,
        name: 'Planète',
        path: 'https://kaleela.com/wp-content/uploads/2019/08/Geography-Terms-In-Arabic-Language.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 39,
        name: 'Europe',
        path: 'https://images-na.ssl-images-amazon.com/images/I/717rMnuN-dL._AC_SL1471_.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 40,
        name: 'Années 80',
        path: 'https://www.theunley.com.au/wp-content/uploads/time-warp-80s-theme-party-the-unley.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 41,
        name: 'Années 70',
        path: 'https://img.wavescdn.com/1lib/images/blog/preview/tips-for-mixing-and-producing-70s-sounds.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 42,
        name: 'Desireless',
        path: 'https://inthe80sblog.files.wordpress.com/2018/07/in-the-80s-desireless.jpg?w=768',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 43,
        name: 'France Gall',
        path: 'https://img-4.linternaute.com/Cx-t79bXwRUlcqRK-t-fzoUYuCQ=/1240x/smart/a4dc274428cc495f8725c740b67cca37/ccmcms-linternaute/13318420.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 44,
        name: 'Mylène Farmer',
        path: 'https://resize-parismatch.lanmedia.fr/img/var/news/storage/images/paris-match/people/mylene-farmer-ses-racines-sa-liberte-1258895/21122651-1-fre-FR/Mylene-Farmer-ses-racines-sa-liberte.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 45,
        name: 'Jeanne Mas',
        path: 'https://s.rfi.fr/media/display/35878e7a-1232-11ea-8bd6-005056bf7c53/w:1240/p:16x9/photo_promo_jeanne_mas_c_bernard_mouillon_0.webp',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 46,
        name: 'Jean-Pierre Mader',
        path: 'https://lvdneng.rosselcdn.net/sites/default/files/dpistyles_v2/ena_16_9_extra_big/2020/01/31/node_703316/45231189/public/2020/01/31/B9722426948Z.1_20200131163450_000%2BG8AFE21OQ.1-0.jpg?itok=x4q_cgtx1580484899',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 47,
        name: 'Supertramp',
        path: 'https://img.nrj.fr/WbFRJWZnBTmYkuLtsEVXess3AWY=/https://image-api.nrj.fr/medias/2020/02/supertramp-top10_5e4a6ab776527.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 48,
        name: 'Bee Gees',
        path: 'https://acadienouvelle-6143.kxcdn.com/wp-content/uploads/2017/01/bee-gees-art-ppcorn-2016.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 49,
        name: 'The Beach Boys',
        path: 'https://i0.wp.com/www.epiphanies-mag.com/wp-content/uploads/2017/05/beach-boys-po.jpg?fit=2490%2C1752',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 50,
        name: 'Genesis',
        path: 'https://img.src.ca/2014/06/17/1250x703/GI_140617_su00t_aetd_genesis_1974_sn1250.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 51,
        name: 'Rita Mitsouko',
        path: 'https://cdn.radiofrance.fr/s3/cruiser-production/2018/02/cb393d13-41b6-4984-8a61-b6c4cd300f45/1200x800_gettyimages-517293703.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 52,
        name: 'Eurythmics',
        path: 'https://cdn.smehost.net/eurythmicscom-ukprod/wp-content/uploads/2018/04/eurythmics-web.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 53,
        name: 'Louis Bertignac',
        path: 'https://file.concertsenboite.fr/wp-content/gallery/louis-bertignac-usine-istres-13-11-2015/Louis-Bertignac-Usine-Istres-13-11-2015-8.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 54,
        name: 'Veronique Sanson',
        path: 'https://media.stubhubstatic.com/stubhub-catalog/d_defaultLogo.jpg/t_f-fs-0fv,q_auto:low,f_auto,c_fill,dpr_2.0,$w_750,$h_416/performer/100273729/hg68jistcjexvyhc6dvh',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 55,
        name: 'Catherine Lara',
        path: 'https://gal.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fprismamedia_people.2F2017.2F06.2F30.2Fd91ad97f-ac11-4988-a307-cc1aa85e5b32.2Ejpeg/2216x1536/quality/80/catherine-lara.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 56,
        name: 'Indochine',
        path: 'https://image-api.nrj.fr/http/media.nrj.fr/1900x1200/2017/09/indochine-c-hidiro-jpg-4393104.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 57,
        name: 'Cookie Dingler',
        path: 'https://cdn-s-www.lalsace.fr/images/166E1409-338C-43D2-BC75-5DA9049C2F60/NW_detail_M/title-1576680650.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 58,
        name: 'Partenaire Particulier',
        path: 'https://file1.telestar.fr/var/telestar/storage/images/media/images/2015/photos/20150401-que-devient-le/partenaire-particulier2/811807-1-fre-FR/Partenaire-Particulier.jpg?alias=original',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 59,
        name: 'Regrets',
        path: 'https://hexagone.me/wp-content/uploads/2016/01/DSC05155-4.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 60,
        name: 'Alain Souchon',
        path: 'https://cdn-europe1.lanmedia.fr/var/europe1/storage/images/europe1/culture/pour-alain-souchon-le-confinement-montre-quon-a-besoin-des-autres-3959446/54659620-1-fre-FR/Pour-Alain-Souchon-le-confinement-montre-qu-on-a-besoin-des-autres.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 61,
        name: 'Gold',
        path: 'https://images.ladepeche.fr/api/v1/images/view/5c37a2603e45464fa90791bd/large/image.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 62,
        name: 'Les Charts',
        path: 'https://www.theaudiodb.com/images/media/artist/thumb/vspvqr1432311727.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 63,
        name: 'Niagara',
        path: 'https://img-4.linternaute.com/hg1SUUgOq03SpoluYjOfXSdgpa4=/1240x/smart/b312f1bcea0040c29e3f83539de20c5a/ccmcms-linternaute/11631687.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 64,
        name: 'Piano',
        path: 'https://test.unionsaintjean.org/wp-content/uploads/2016/07/Piano.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }],
    {})
    .then(() => queryInterface.sequelize.query('ALTER SEQUENCE "images_id_seq" RESTART WITH 65')),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('images', null, {})
};
