<?php

namespace nsept\listinput;

use yii\web\AssetBundle;

class ListInputAsset extends AssetBundle
{
    public $sourcePath = '@nsept/listinput/assets/';
    public $js = [
        'js/listinput.js'
    ];
    public $depends = [
        'yii\web\JqueryAsset',
        'yii\bootstrap\BootstrapAsset',
        'yii\jui\JuiAsset',
    ];
}
