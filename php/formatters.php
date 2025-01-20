<?php
function format_and_insert_data($data, $type){
    $formatted_data = [];

    foreach($data as $data_item){
        $ids = explode(",", $data_item["ingredient_ids"]);
        $names = explode(",", $data_item["ingredient_names"]);
        $amounts = explode(",", $data_item["ingredient_amounts"]);

        $formatted_item = [
            "id" => $data_item["id"],
            "name" => $data_item["name"],
        ];

        if($type === "food"){
            $formatted_item["prep_method"] = $data_item["prep_method"];
            $formatted_item["rot_time"] = $data_item["rot_time"];
        }
        else{
            $formatted_item["patience"] = $data_item["patience"];
        }

        for($i = 0; $i < count($ids); $i++){
            /* $sql = "INSERT INTO ()"; */
            $formatted_item["ingredients"][] = [
                "id" => intval($ids[$i]),
                "name" => $names[$i],
                "amount" => $amounts[$i]
            ];
        }
        $formatted_data[] = $formatted_item;
    }
    return $formatted_data;
}