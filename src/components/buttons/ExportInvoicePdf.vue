<script setup>
import jsPDF from "jspdf";

const exportPdf = () => {
  const doc = new jsPDF();
  doc.text("Hello world!", 10, 10);
  doc.save("a4.pdf");
};
</script>
<template>
  <button class="btn btn-primary" @click="exportPdf">
    <i class="fas fa-file-excel"></i>
    Export Excel
  </button>
</template>
