<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;

class ExcelCollection implements FromArray
{
    protected $excel_data;

    public function __construct($data)
    {
        $this->excel_data = $data;
    }

    public function array(): array
    {
        return $this->excel_data;
    }
}