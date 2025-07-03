---
date: 2023-12-17
publishDate: ""
cssclasses:
  - note
  - page
path: content
filename: sidebar-images
title: Css для картинок в сайдбаре
share: true
menu: true
feed: true
toc: false
collapse: false
weight: 10
tags:
  - css
  - Obsidian
parent: obsidian
Класс: "[[24. Страница на сайт|Страница на сайт]]"
Статус страницы:
  - 📢 опубликовано
---

Иногда хочется украсить свой Обсидиан картинками, но чтобы это смотрелось ненавязчиво. Я не очень люблю фоновые картинки и баннеры в заметках, но мне нравится добавлять картинки в боковую панель.

Для этого нужно сперва добавить файл изображения в хранилище, открыть его, а затем перетащить и закрепить в боковой панели, над или под основными вкладками. 

Но по умолчанию такая картинка смотрится не очень хорошо, потому что получаются лишние отступы, и верхняя панель занимает слишком много места. Вот как это выглядит:

![[d7905ca71b883cf177538cb3f066a558_MD5.jpg]]

Чтобы улучшить отображение картинки я написала такой css-сниппет:

```css
:is(.mod-left-split, .mod-right-split) .workspace-tabs:has(.image-container):not(.mod-active) .workspace-tab-header-container {
    display: none;
}

:is(.mod-left-split, .mod-right-split) .workspace-tabs:has(.image-container) {
    max-height: 150px;;
}

:is(.mod-left-split, .mod-right-split) .workspace-tabs:has(.image-container) .workspace-tab-container .view-content {
 padding: 0;
 overflow: hidden;
}

:is(.mod-left-split, .mod-right-split) .workspace-tabs:has(.image-container):not(.mod-active) .workspace-tab-container .view-content .image-container {
    padding-top: 5px;

}

:is(.mod-left-split, .mod-right-split) .workspace-tabs:has(.image-container) .workspace-tab-container .view-content .image-container {
    width: 100%;
    height: 100%;
}

:is(.mod-left-split, .mod-right-split) .workspace-tabs:has(.image-container) .workspace-tab-container .view-content img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

После подключения сниппета картинка выглядит так:

![[e701c7cba3c4fcaf573d39b07c97b7b2_MD5.jpg]]

Теперь она занимает всю область, без отступов, и выглядит более стильно. Верхняя панель скрыта и будет появляться только при клике на картинку.

