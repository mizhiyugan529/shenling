 # Flarum için Diff

[![MIT lisansı](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/the-turk/flarum-diff/blob/master/LICENSE) [![Son Stabil Sürüm](https://img.shields.io/packagist/v/the-turk/flarum-diff.svg)](https://packagist.org/packages/the-turk/flarum-diff) [![Toplam İndirme](https://img.shields.io/packagist/dt/the-turk/flarum-diff.svg)](https://packagist.org/packages/the-turk/flarum-diff)

Bu eklenti [Flarum](https://github.com/flarum) forumunuza "düzenleme geçmişi" özelliği eklemenizi sağlar.

Ekran görüntüleri:

![Kolaj](https://i.ibb.co/FJywHKn/rsz-diff-collage.png)

- [Mesaj Görünümü](https://i.ibb.co/4m21pnM/post-Stream-Item.png)
- [Revizyon Listesi](https://i.ibb.co/PTTcWCw/dropdown-List.png)

## Özellikler

- [jfcherng/php-diff](https://github.com/jfcherng/php-diff) tabanlıdır.
- **satır** (varsayılan), **kelime** ve **karakter** seviyesindeki farklılıkları hesaplayabilir.
- "Aynı hizada", "Yan yana" ve "Kombine" olmak üzere üç ayrı gösterim modu vardır.
- Eski düzenlemeleri elle ya da zamanlanmış görev kullanarak arşivleyebilirsiniz.
- Düzenleme geçmişlerini silebilir ya da eski bir düzenlemeye geri dönebilirsiniz.
- `fof/nightmode` ve `the-turk/flarum-quiet-edits` eklentilerini destekler.
- [css-grid](https://caniuse.com/#feat=css-grid) modülünü destekleyen bütün tarayıcılarda çalışır.

## Gereksinimler

![php](https://img.shields.io/badge/php-%5E7.1.3-blue?style=flat-square) ![ext-iconv](https://img.shields.io/badge/ext-iconv-brightgreen?style=flat-square)

php sürümünüzü `php -v` komutunu çalıştırarak ve `iconv` pakedinin yüklü olup olmadığını `php --ri iconv` komutunu çalıştırarak (`iconv support => enabled` çıktısını görmelisiniz) öğrenebilirsiniz.

Eğer `flarum/core` beta 12 ve üzeri bir sürümünü kullanıyorsanız, "Ön İzleme" modunda söz dizimi vurgulamasını kullanabilmek için `s9e/text-formatter` paketini v2.3.7 sürümüne yükseltmeniz gerekir:

```
composer update s9e/text-formatter:2.3.7
```

## Çakışmalar

Bu eklenti aşağıdakilerle çakışmaktadır:

- [dem13n/nickname-changer](https://discuss.flarum.org/d/21238-nickname-changer). Bunun yerine [fof/username-request](https://discuss.flarum.org/d/20956-friendsofflarum-username-request) eklentisini kullanabilirsiniz.

- Eğer [the-turk/flarum-edit-notifications](https://discuss.flarum.org/d/22896-edit-notifications/17) eklentisini kullanıyorsanız, bu eklentinin v0.1.4 sürümüne yükseltme yapmanız gerekir.
```bash
composer update the-turk/flarum-edit-notifications:0.1.4
```

## Kurulum

[Bazaar](https://discuss.flarum.org/d/5151) kullanın ya da elle kurulum yapın:

```bash
composer require the-turk/flarum-diff
```

## Güncelleme

```bash
composer update the-turk/flarum-diff
php flarum migrate
php flarum cache:clear
```

## Kullanım

Eklentiyi aktif edin ve izinleri ayarlayın. Kullanmaya başlayabilirsiniz!

### Eski Düzenlemeleri Arşivlemek

**x** mesajın düzenlenme sayısı olmak üzere, **x ≥ A** koşulu sağlandığında mesaja ait ilk **y=mx+b** düzenlemeyi birleştirip sıkıştırarak yeni bir tabloda (`post_edit_histories_archive`) `BLOB` tipinde saklayabilirsiniz. **A**, **m** ve **b** değerlerini eklentinin ayarlarından belirleyin. Ondalık **y** değerleri en yakın alt tam sayıya yuvarlanacaktır. Depolama alanından tasarruf etmek istiyorsanız, eski düzenlemeleri arşivlemeniz önerilir ancak _depolama alanı sıkıntınız yoksa önerilmez_.

Eski düzenlemeleri arşivlemek istiyorsanız _zamanlanmış görev seçeneğini_ aktif edebilirsiniz. Bu görev `diff:archive` komutunu kullanarak her hafta pazar günü sabah saat 02:00'de çalışır**. Zamanlanmış görev kullanmazsanız, mesajın her düzenlemesinden sonra mesaja ait eski düzenlemeler taranır ve arşivlenir. Diğer bir seçenek de `php flarum diff:archive` komutunu kullanarak eski düzenlemeleri elle arşivlemektir.

> **: Zamanlanmış görevlerin çalışabilmesi için Linux sunucunuza aşağıdaki komutu vermelisiniz:
>
> `* * * * * php /<path/to/flarum>/flarum schedule:run >> /dev/null 2>&1`
>
> Bu komut dakikada bir zamanlanmış görevleri kontrol eder ve zamanı gelmiş görevleri çalıştırır.

## Bağlantılar

- [Flarum tartışma konusu](https://discuss.flarum.org/d/22779-diff-for-flarum)
- [GitHub üzerindeki kaynak kodu](https://github.com/the-turk/flarum-diff)
- [Değişiklikler](https://github.com/the-turk/flarum-diff/blob/master/CHANGELOG.md)
- [Sorun bildir](https://github.com/the-turk/flarum-diff/issues)
- [Packagist aracılığıyla indir](https://packagist.org/packages/the-turk/flarum-diff)
