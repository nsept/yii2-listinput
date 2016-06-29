Yii2-ListInput
==============

A Yii2 input widget extension for manage lists.

Installation
------------

The preferred way to install this extension is through [composer](http://getcomposer.org/download/).

Either run

```
composer require --prefer-dist nsept/yii2-listinput "@dev"
```

or add

```
"nsept/yii2-listinput": "@dev"
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
