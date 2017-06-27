<?

  /**
   * fruit classes
   */
  class fruits
  {

    function __construct($parent)
    {
      $this->db = $parent->db;
    }


    // select * from users
    // for method functions use long descriptive names
    public function dbSelect($sql, $array = array()){
      $this->sql = $this->db->prepare($sql);
      $result = $this->sql->execute($array);
      $data = $this->sql->fetchAll();
      return $data;
    }

    // add a fruit
    public function dbInsert($sql, $array = array()){
      $this->sql = $this->db->prepare($sql);
      $result = $this->sql->execute($array);
    }

    public function dbUpdate($sql, $array = array()){
      $this->sql = $this->db->prepare($sql);
      $result = $this->sql->execute($array);
    }

    public function dbDelete($sql, $array = array()){
      $this->sql = $this->db->prepare($sql);
      $result = $this->sql->execute($array);
    }


  }
?>
