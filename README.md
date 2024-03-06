# Componere

This is a template for a simple application for VSK Apps. It is based on the Python, Vue.js and TypeScript.

## Dependencies

Componere depends on the following packages:

* [libvasak-ui](https://github.com/Vasak-OS/PKGBUILDS/blob/main/libvasak-ui/PKGBUILD)
* [python-libvasak](https://github.com/Vasak-OS/PKGBUILDS/blob/main/python-libvasak/PKGBUILD)

## Start Componere

To start Application, run the following steps:

1. Clone the repository

```bash
git clone git@github.com:Vasak-OS/componere.git
```

2. Move to the directory

```bash
cd componere
```

3. Install dependencies and Build UI

```bash
cd ui/
yarn install
yarn build
cd ..
```

4. Start Application

```bash
python componere.py --webEngineArgs --remote-debugging-port=3030 --remote-allow-origins=http://127.0.0.1:3030 # --debug
python componere.py # normal mode
```

## PKGBUILD Template

```conf
# Maintainer: Your Name <your_email@domain>

pkgname=componere
pkgver=0.0.1
pkgrel=1
pkgdesc="PKGBUILD template for VSK Apps"
url="https://github.com/Vasak-OS/$pkgname/"
depends=(
    'python-libvasak'
    'libvasak-bootstrap'
    'libvasak-ui'
)
makedepends=(
    'nodejs'
)
license=('GPL')
arch=('x86_64')
md5sums=('68c81dfe3a33b44ea3c88451fccdc159')
source=("$url/archive/refs/tags/$pkgver.tar.gz")

package() {
    cd $pkgname-$pkgver
    install -dm755 "${pkgdir}/usr/share/${pkgname}/"
    install -d "${pkgdir}/bin"
    cd "${pkgdir}/usr/share/${pkgname}/ui" && npm i && npm run build
    cp -r "${srcdir}/${pkgname}-${pkgver}/src/*" "${pkgdir}/usr/share/${pkgname}/src/"
    cp -r "${srcdir}/${pkgname}-${pkgver}/ui/dist/*" "${pkgdir}/usr/share/${pkgname}/ui/dist/"
    cp "${srcdir}/${pkgname}-${pkgver}/${pkgname}" "${pkgdir}/usr/share/${pkgname}/"
    cp "${srcdir}/${pkgname}-${pkgver}/${pkgname}.py" "${pkgdir}/usr/share/${pkgname}/"
    
    chmod a+x "${pkgdir}/usr/share/${pkgname}/${pkgname}"
    ln -sf "/usr/share/${pkgname}/${pkgname}" "${pkgdir}/bin/${pkgname}"
}
```

## Contributors

<a href="https://github.com/vasak-os/componere/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=vasak-os/componere" />
</a>