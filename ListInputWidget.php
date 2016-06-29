<?php

namespace nsept\listinput;

use Yii;
use yii\widgets\InputWidget;
use yii\helpers\Json;
use yii\base\InvalidConfigException;
use yii\bootstrap\Html;

class ListInputWidget extends InputWidget
{
    /**
     * @var \yii\widgets\ActiveForm
     */
    public $form;
    /**
     * @var string
     */
    public $template = "{label}\n{input}\n{error}";

    /**
     * @var array
     */
    public $pluginOptions = [];

    /**
     * @inheritdoc
     */
    public function run()
    {
        parent::init();

        ListInputAsset::register($this->view);

        $pluginOptions = Json::encode($this->pluginOptions);
        $this->view->registerJs(sprintf('$("#%s").listinput(%s)', $this->options['id'], $pluginOptions));

        if ($this->hasModel()) {
            if ($this->form == null)
                throw new InvalidConfigException(__CLASS__ . '::$form must be specifed.');
            return $this->form->field($this->model, $this->attribute,
                ['template' => $this->template])->textInput($this->options);
        } else {
            return Html::textInput($this->name, $this->value, $this->options);
        }
    }
}
