---
date: 2024-11-18
cssclasses:
  - note
Класс: "[[24. Страница на сайт|Страница на сайт]]"
publishDate: ""
path: content
filename: pocketbook-collection-calibre-plugin
title: Pocketbook Collections — мой новый плагин для Calibre
parent: pet-projects
share: true
menu: true
feed: true
toc: true
collapse: false
weight: 10
Ссылка: https://paperless-forest.ru/pocketbook-collection-calibre-plugin/
Статус страницы:
  - 📢 опубликовано
tags:
  - Calibre
  - Pocketbook
---



У меня есть большая коллекция электронных книг, и для их организации на компьютере я использую потрясающую программу [[Calibre]]. Это очень мощная программа, позволяющая конвертировать книги, изменять их метаданные, организовавыть по категориям, переименовывать файлы и отправлять их на подключённое устройство для чтения, а также многое, многое другое.

Сами книги я предпочитаю читать на моей читалке [[Pocketbook]] 627. В этой читалке очень удобная библиотека, позволяющая фильтровать книги по жанрам, авторам и сериям, но кроме того там есть возможность отмечать книги как прочитанные, добавлять их в избранное или в пользовательские коллекции.

К сожалению, управлять коллекциями с самого устройства не очень удобно из-за медленной работы e-ink-экрана, особенно если нужно рассортировать по коллекциям большое количество книг сразу. Поэтому мне давно хотелось иметь возможность управлять коллекциями на читалке с компьютера. Так что несколько лет назад я даже написала [[Менеджер коллекций для Покетбука|приложение]] для этого. 

В принципе это приложение работает, но я им недовольна: оно сырое, медленное и не слишком удобное, потому что, когда я его писала, то только пыталась разобраться, как вообще устроен код, и не особенно представляла, что вообще делаю. К тому же, тогда я более-менее знала только Javascript, поэтому приложение написано на Electron, что, на мой взгляд, не лучший выбор для такой задачи. По мере использования я столкнулась и с ещё одной проблемой: приложение изменяло данные на устройстве, но не сохраняло их на компьютере, так что в случае перезаписывания книг на устройстве, все коллекции приходилось сортировать заново.

В последнее время я начала чувствовать себя более уверенно с программированием, поэтому у меня появилась мысль доработать приложение, чтобы сделать его более удобным. Однако потом я посмотрела на всю эту кучу кода и подумала: почему бы просто не написать плагин для Calibre? В таком случае мне не нужно будет писать графическую оболочку, все эти фильтры и кнопки, а достаточно просто добавить логику для синхронизации данных в Calibre с базой данных читалки.

Челлендж заключался в том, что плагины для Calibre пишутся на Python, с которым я прежде не работала и знаю только самые основы. Так что пришлось разбираться, гуглить и ковыряться в чужом коде, но в итоге, после пары недель мучений я его всё-таки написала!

## Принцип работы

Плагин позволяет синхронизировать коллекции, а также статус прочтения и статус избранного между книгами в Calibre и книгами в читалке Pocketbook.

Для этого в Calibre нужно будет создать три дополнительные колонки:
- колонку "#shelf" с типом "Текст, разделённый запятыми, работает как тэги";
- колонку "#read" с типом "да / нет";
- колонку "#favorite" с типом "да / нет".

Можно указать другие названия колонок в настройках плагина.

После подключения читалки к компьютеру по USB , в главном меню появится иконка плагина Pocketbook Collections. При клике на кнопку меню можно увидеть список команд для плагина.

Команды позволяют отправлять данные из Calibre в читалку или наоборот, выгружать из читалки в Calibre. Можно отправлять и выгружать сразу всё, либо коллекции и статусы по отдельности.

> [!info] Ссылки
> 
> Плагин можно скачать [здесь](https://github.com/anareaty/Pocketbook-Collections/releases) и установить вручную в настройках Calibre с помощью команды «Загрузить плагин из файла». Надеюсь, что скоро от накже появится в списке автоматической загрузки. А вот здесь написала [пост о плагине](https://www.mobileread.com/forums/showthread.php?t=364716) на форуме Mobileread.

## Примечания 

Я пробовала также добавить двухстороннюю синхронизацию, основанную на времени последнего изменения, но результат мне не понравился. Во-первых, на моём Покетбуке почему-то иногда сбивается время, что приводит к ошибкам в таймштампах. Во-вторых, Calibre не сохраняет отдельные таймштампы для каждой колонки, а только хранит время изменения всей книги. Из-за этого было не всегда возможно точно определить, где именно — в Calibre или на читалке — произошли последние изменения коллекций и статусов, чтобы сохранить релевантные данные. Возможно я ещё попробую реализовать эту функцию позже, но пока что ручной выбор отправляемых и загружаемых данных выглядит надёжнее.

Я также думаю о том, не добавить ли синхронизацию позиции чтения, заметок и закладок, или что там есть ещё. Не то чтобы мне был очень нужен этот функционал, но теоретически он может быть полезен. Но это как-нибудь потом.

> [!important] Важно
> 
> Плагин позволяет добавлять данные только для книг, которые уже есть на устройстве и проиндексированы. Pocketbook индексирует новые книги только после отключения читалки от компьютера. Это означает, что если вы добавили в читалку новые книги, нужно отсоединить её от компьютера, подождать, пока устройство обнаружит книги и добавит их в базу данных, затем снова подключить читалку к компьютеру, и тогда уже можно будет добавить коллекции для новых книг.

Плагин протестирован только на моём устройстве Pocketbook 627, но он может работать и с другими читалками Pocketbook при условии, что они используют ту же самую структуру базы данных.

