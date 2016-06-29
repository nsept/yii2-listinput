Yii2-ListInput
==============

![example](https://camo.githubusercontent.com/b97f8e13dc689c9051d5c2bd4952e100de8efda3/68747470733a2f2f7333312e706f7374696d672e6f72672f68753367363664616a2f6c697374696e7075742e6a7067)

A Yii2 input widget extension for manage lists.

Installation
------------

The preferred way to install this extension is through [composer](http://getcomposer.org/download/).

Either run

```
composer require --prefer-dist nsept/yii2-listinput "*"
```

or add

```
"nsept/yii2-listinput": "*"
```

to the require section of your `composer.json` file.

Usage
-----

Once the extension is installed, simply use it in your code by :

```php
<?= nsept\listinput\ListInputWidget::widget([
    'form'      => $form,
    'model'     => $model,
    'attribute' => 'list'
]) ?>
```
